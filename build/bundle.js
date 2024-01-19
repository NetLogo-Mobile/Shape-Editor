
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        const options = { direction: 'in' };
        let config = fn(node, params, options);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config(options);
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        const updates = [];
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                // defer updates until all the DOM shuffling is done
                updates.push(() => block.p(child_ctx, dirty));
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        run_all(updates);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    class GalapagosShapeSelectorDialog {
        // Constructor function
        constructor(parent, config) {
            // Array of all shapes to display
            this.shapes = [];
            // Array of shapes that match the current search term and type filter
            this.filteredShapes = [];
            // The ID of the currently selected shape
            this.selectedItemId = null;
            // The IDs of the recently imported shapes
            this.recentlyImportedShapeIds = [];
            // Initialize all fields
            this.parent = parent;
            // shapes array is initialized with default shapes, should be imported from json in the future
            this.shapes = [
                {
                    id: 1,
                    name: 'default',
                    image: 'shapes/down-arrow.png',
                    type: 'turtle',
                    hover: false,
                    deletable: false,
                    isDeleting: false,
                },
                {
                    id: 2,
                    name: 'default',
                    image: 'shapes/down-arrow.png',
                    type: 'link',
                    hover: false,
                    deletable: false,
                    isDeleting: false,
                },
            ];
            this.searchTerm = '';
            this.filteredShapes = this.shapes;
            this.currentType = 'turtle';
            this.config = config;
            this.filterShapes(this.currentType);
            this.dialogOpen = true;
            this.importButtonSelected = false;
            this.libraryOpen = false;
        }
        // function to open and close the dialog
        toggleDialog() {
            this.dialogOpen = !this.dialogOpen;
            this.config.onUpdateDialogOpen(this.dialogOpen);
        }
        // function to open the library
        openLibrary() {
            this.libraryOpen = true;
            this.importButtonSelected = false;
            this.config.onUpdateLibraryOpen(this.libraryOpen);
            this.config.onUpdateImportButtonSelected(this.importButtonSelected);
        }
        // function to close the library
        closeLibrary() {
            console.log('close library');
            this.libraryOpen = false;
            this.config.onUpdateLibraryOpen(this.libraryOpen);
        }
        // Create a new default shape object
        createShape() {
            // set imported shapes to empty
            this.recentlyImportedShapeIds = [];
            this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);
            const newShape = {
                id: Math.max(...this.shapes.map((shape) => shape.id)) + 1,
                name: 'new default',
                image: 'shapes/down-arrow.png',
                type: this.currentType,
                hover: false,
                deletable: true,
                isDeleting: false,
            };
            // Add the new shape to the beginning of the shape array and update the filtered shape list
            this.shapes.unshift(newShape);
            this.shapes = [...this.shapes];
            this.config.onUpdateShapes(this.shapes);
            this.filterShapes(this.currentType);
            this.config.onUpdateFilteredShapes(this.filteredShapes);
        }
        // functino to handle import shape button
        importShapes() {
            this.importButtonSelected = !this.importButtonSelected;
            this.config.onUpdateImportButtonSelected(this.importButtonSelected);
        }
        // function to handle duplicate button click
        duplicateShape(id) {
            const shapeToDuplicate = this.shapes.find((shape) => shape.id === id);
            if (shapeToDuplicate) {
                const { name } = shapeToDuplicate;
                const nameMatch = name.match(/^(.*?)(\s(\d+))?$/);
                if (nameMatch) {
                    const baseName = nameMatch[1];
                    const existingIndices = [];
                    for (const shape of this.shapes) {
                        if (shape.name.indexOf(baseName) === 0) {
                            const indexMatch = shape.name.match(/^.*\s(\d+)$/);
                            if (indexMatch) {
                                existingIndices.push(Number(indexMatch[1]));
                            }
                        }
                    }
                    let insertIndex = -1;
                    for (let i = 0; i < this.shapes.length; i++) {
                        if (this.shapes[i].id === id) {
                            insertIndex = i;
                            break;
                        }
                    }
                    let newInsertIndex = insertIndex;
                    if (existingIndices.length >= 1) {
                        const maxIndex = Math.max(...existingIndices);
                        for (let i = 0; i < this.shapes.length; i++) {
                            if (this.shapes[i].name === `${baseName} ${maxIndex}`) {
                                newInsertIndex = i;
                                break;
                            }
                        }
                    }
                    const newIndex = existingIndices.length
                        ? Math.max(...existingIndices) + 1
                        : 1;
                    const newName = `${baseName} ${newIndex}`;
                    const duplicatedShape = Object.assign(Object.assign({}, shapeToDuplicate), { name: newName, hover: false, deletable: true });
                    const newId = Math.max(...this.shapes.map((shape) => shape.id)) + 1;
                    duplicatedShape.id = newId;
                    this.shapes.splice(newInsertIndex + 1, 0, duplicatedShape);
                    this.shapes = [...this.shapes];
                    this.handleSearch(this.searchTerm);
                    this.config.onUpdateShapes(this.shapes);
                    this.config.onUpdateFilteredShapes(this.filteredShapes);
                }
            }
        }
        // function to handle adding shapes
        addNewShapes(newShapes) {
            // set recently imported to empty
            this.recentlyImportedShapeIds = [];
            this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);
            newShapes.forEach((shape) => {
                // make the shape the next available id and set the type to the current type
                shape.id = Math.max(...this.shapes.map((shape) => shape.id)) + 1;
                shape.type = this.currentType;
                shape.hover = false;
                shape.deletable = true;
                if (shape.name === 'default') {
                    shape.deletable = false;
                }
                // add shape to the shapes array
                this.shapes.push(shape);
                // add to recently imported
                this.recentlyImportedShapeIds.push(shape.id);
            });
            // sort shapes by alphabetical order keeping defaults at the start
            this.shapes.sort((a, b) => {
                if (a.name === 'default')
                    return -1;
                if (b.name === 'default')
                    return 1;
                return a.name.localeCompare(b.name);
            });
            this.shapes = [...this.shapes];
            this.config.onUpdateShapes(this.shapes);
            this.filterShapes(this.currentType);
            this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);
        }
        // function to handle delete button click
        deleteShape(id) {
            console.log('delete shape');
            let shapeIndexToDelete = -1;
            let filteredShapeIndexToDelete = -1;
            for (let i = 0; i < this.shapes.length; i++) {
                if (this.shapes[i].id === id) {
                    shapeIndexToDelete = i;
                }
            }
            for (let i = 0; i < this.filteredShapes.length; i++) {
                if (this.filteredShapes[i].id === id) {
                    filteredShapeIndexToDelete = i;
                }
            }
            if (shapeIndexToDelete !== -1 && filteredShapeIndexToDelete !== -1) {
                this.shapes[shapeIndexToDelete].isDeleting = true;
                this.filteredShapes[filteredShapeIndexToDelete].isDeleting = true;
                this.shapes = [...this.shapes];
                this.filteredShapes = [...this.filteredShapes];
                this.config.onUpdateShapes(this.shapes);
                this.config.onUpdateFilteredShapes(this.filteredShapes);
                setTimeout(() => {
                    this.shapes.splice(shapeIndexToDelete, 1);
                    this.shapes = [...this.shapes];
                    this.handleSearch(this.searchTerm);
                    this.config.onUpdateShapes(this.shapes);
                    this.config.onUpdateFilteredShapes(this.filteredShapes);
                }, 500);
            }
        }
        // function to filter shapes when type filter changes
        filterShapes(type) {
            this.currentType = type;
            this.filteredShapes = [];
            for (let i = 0; i < this.shapes.length; i++) {
                const shape = this.shapes[i];
                if (shape.type === this.currentType &&
                    shape.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1) {
                    this.filteredShapes.push(shape);
                }
            }
            this.config.onUpdateFilteredShapes(this.filteredShapes);
        }
        // function update shapes when search term changes
        handleSearch(term) {
            this.searchTerm = term;
            this.filterShapes(this.currentType);
            this.config.onUpdateFilteredShapes(this.filteredShapes);
        }
        // function to handle shape selection
        setSelectedItemId(id) {
            if (this.selectedItemId === id) {
                this.selectedItemId = null;
            }
            else {
                this.selectedItemId = id;
            }
            // console log this information in selected shape
            console.log(this.shapes.find((shape) => shape.id === this.selectedItemId));
            this.recentlyImportedShapeIds = [];
            this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);
            this.config.onUpdateSelectedItemId(this.selectedItemId);
        }
    }

    class GalapagosShapeSelectorLibrary {
        constructor(parent, config) {
            // Array of all shapes to display
            this.shapes = [];
            // Array of shapes that match the current search term and type filter
            this.filteredShapes = [];
            // The IDs of the currently selected shapes
            this.selectedItemIds = [];
            // Initialize all fields
            this.parent = parent;
            // shapes array is initialized with default shapes, should be imported from json in the future
            this.shapes = [
                {
                    id: 1,
                    name: 'default',
                    image: 'shapes/down-arrow.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 2,
                    name: 'ghost',
                    image: 'shapes/ghost.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 3,
                    name: 'turtle',
                    image: 'shapes/cute-turtle.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 4,
                    name: 'turtle',
                    image: 'shapes/cute-turtle.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 5,
                    name: 'turtle',
                    image: 'shapes/cute-turtle.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 6,
                    name: 'turtle',
                    image: 'shapes/cute-turtle.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 7,
                    name: 'turtle',
                    image: 'shapes/cute-turtle.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 8,
                    name: 'turtle',
                    image: 'shapes/cute-turtle.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 9,
                    name: 'turtle',
                    image: 'shapes/cute-turtle.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
                {
                    id: 10,
                    name: 'turtle',
                    image: 'shapes/cute-turtle.png',
                    type: 'turtle',
                    hover: false,
                    deletable: true,
                    isDeleting: false,
                },
            ];
            this.searchTerm = '';
            this.filteredShapes = this.shapes;
            this.currentType = 'turtle';
            this.config = config;
            this.filterShapes(this.currentType);
            this.dialogOpen = true;
        }
        // function to filter shapes when type filter changes
        filterShapes(type) {
            this.currentType = type;
            this.filteredShapes = [];
            for (let i = 0; i < this.shapes.length; i++) {
                const shape = this.shapes[i];
                if (shape.type === this.currentType &&
                    shape.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1) {
                    this.filteredShapes.push(shape);
                }
            }
            this.config.onUpdateFilteredShapes(this.filteredShapes);
        }
        // function update shapes when search term changes
        handleSearch(term) {
            this.searchTerm = term;
            this.filterShapes(this.currentType);
            this.config.onUpdateFilteredShapes(this.filteredShapes);
        }
        // function to handle shape selection
        setSelectedItemId(id) {
            // find the index of the id in the array
            const index = this.selectedItemIds.indexOf(id);
            // if id is in the array, remove it
            if (index > -1) {
                this.selectedItemIds.splice(index, 1);
            }
            else {
                // if id is not in the array, add it
                this.selectedItemIds.push(id);
            }
            console.log(this.selectedItemIds.map((id) => this.shapes.find((shape) => shape.id === id)));
            this.config.onUpdateSelectedItemIds([...this.selectedItemIds]);
        }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src/LibraryDialog.svelte generated by Svelte v3.59.1 */
    const file$1 = "src/LibraryDialog.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[23] = list[i];
    	child_ctx[24] = list;
    	child_ctx[25] = i;
    	return child_ctx;
    }

    // (372:12) {#each filteredShapes as shape (shape.id)}
    function create_each_block$1(key_1, ctx) {
    	let button;
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let t1_value = /*shape*/ ctx[23].name + "";
    	let t1;
    	let div1_class_value;
    	let t2;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	function mouseenter_handler() {
    		return /*mouseenter_handler*/ ctx[11](/*shape*/ ctx[23], /*each_value*/ ctx[24], /*shape_index*/ ctx[25]);
    	}

    	function mouseleave_handler() {
    		return /*mouseleave_handler*/ ctx[12](/*shape*/ ctx[23], /*each_value*/ ctx[24], /*shape_index*/ ctx[25]);
    	}

    	function focus_handler() {
    		return /*focus_handler*/ ctx[13](/*shape*/ ctx[23], /*each_value*/ ctx[24], /*shape_index*/ ctx[25]);
    	}

    	function blur_handler() {
    		return /*blur_handler*/ ctx[14](/*shape*/ ctx[23], /*each_value*/ ctx[24], /*shape_index*/ ctx[25]);
    	}

    	function click_handler() {
    		return /*click_handler*/ ctx[15](/*shape*/ ctx[23]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			button = element("button");
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(img, "class", "shape-selector-item-image svelte-i5xq7v");
    			if (!src_url_equal(img.src, img_src_value = /*shape*/ ctx[23].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$1, 385, 20, 10925);
    			attr_dev(div0, "class", "shape-selector-item-image-div svelte-i5xq7v");
    			add_location(div0, file$1, 384, 18, 10861);

    			attr_dev(div1, "class", div1_class_value = "shape-selector-item-name " + (/*selectedItemIds*/ ctx[8].includes(/*shape*/ ctx[23].id)
    			? 'font-selected'
    			: '') + " svelte-i5xq7v");

    			add_location(div1, file$1, 391, 18, 11121);
    			attr_dev(div2, "class", "shape-selector-details svelte-i5xq7v");
    			add_location(div2, file$1, 383, 16, 10806);

    			attr_dev(button, "class", button_class_value = "shape-selector-item " + (/*selectedItemIds*/ ctx[8].includes(/*shape*/ ctx[23].id)
    			? 'selected'
    			: '') + " svelte-i5xq7v");

    			add_location(button, file$1, 372, 14, 10304);
    			this.first = button;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, t1);
    			append_dev(button, t2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "mouseenter", mouseenter_handler, false, false, false, false),
    					listen_dev(button, "mouseleave", mouseleave_handler, false, false, false, false),
    					listen_dev(button, "focus", focus_handler, false, false, false, false),
    					listen_dev(button, "blur", blur_handler, false, false, false, false),
    					listen_dev(button, "click", click_handler, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*filteredShapes*/ 64 && !src_url_equal(img.src, img_src_value = /*shape*/ ctx[23].image)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*filteredShapes*/ 64 && t1_value !== (t1_value = /*shape*/ ctx[23].name + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*selectedItemIds, filteredShapes*/ 320 && div1_class_value !== (div1_class_value = "shape-selector-item-name " + (/*selectedItemIds*/ ctx[8].includes(/*shape*/ ctx[23].id)
    			? 'font-selected'
    			: '') + " svelte-i5xq7v")) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (dirty & /*selectedItemIds, filteredShapes*/ 320 && button_class_value !== (button_class_value = "shape-selector-item " + (/*selectedItemIds*/ ctx[8].includes(/*shape*/ ctx[23].id)
    			? 'selected'
    			: '') + " svelte-i5xq7v")) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(372:12) {#each filteredShapes as shape (shape.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div9;
    	let div8;
    	let div0;
    	let h2;
    	let t1;
    	let button0;
    	let img;
    	let img_src_value;
    	let t2;
    	let div5;
    	let div1;
    	let input;
    	let t3;
    	let div4;
    	let div3;
    	let div2;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t4;
    	let div7;
    	let div6;
    	let button1;
    	let t6;
    	let button2;
    	let div9_transition;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*filteredShapes*/ ctx[6];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*shape*/ ctx[23].id;
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div9 = element("div");
    			div8 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Library";
    			t1 = space();
    			button0 = element("button");
    			img = element("img");
    			t2 = space();
    			div5 = element("div");
    			div1 = element("div");
    			input = element("input");
    			t3 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			div7 = element("div");
    			div6 = element("div");
    			button1 = element("button");
    			button1.textContent = "Import";
    			t6 = space();
    			button2 = element("button");
    			button2.textContent = "Cancel";
    			attr_dev(h2, "class", "svelte-i5xq7v");
    			add_location(h2, file$1, 353, 6, 9609);
    			if (!src_url_equal(img.src, img_src_value = "icons/close-button.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "X");
    			attr_dev(img, "class", "svelte-i5xq7v");
    			add_location(img, file$1, 355, 8, 9694);
    			attr_dev(button0, "class", "close-button svelte-i5xq7v");
    			add_location(button0, file$1, 354, 6, 9632);
    			attr_dev(div0, "class", "shape-selector-header svelte-i5xq7v");
    			add_location(div0, file$1, 352, 4, 9548);
    			input.value = /*searchTerm*/ ctx[5];
    			attr_dev(input, "placeholder", "Search");
    			set_style(input, "background-image", "url('icons/search-icon.png')");
    			attr_dev(input, "class", "svelte-i5xq7v");
    			add_location(input, file$1, 360, 8, 9850);
    			attr_dev(div1, "class", "shape-selector-search svelte-i5xq7v");
    			add_location(div1, file$1, 359, 6, 9806);
    			attr_dev(div2, "class", "shape-selector-grid-inner svelte-i5xq7v");
    			add_location(div2, file$1, 370, 10, 10195);
    			attr_dev(div3, "class", "scrollbar-wrapper svelte-i5xq7v");
    			add_location(div3, file$1, 369, 8, 10153);
    			attr_dev(div4, "class", "shape-selector-grid svelte-i5xq7v");
    			add_location(div4, file$1, 368, 6, 10111);
    			attr_dev(div5, "class", "inner-container svelte-i5xq7v");
    			add_location(div5, file$1, 358, 4, 9770);
    			attr_dev(button1, "class", "import-button svelte-i5xq7v");
    			add_location(button1, file$1, 409, 8, 11629);
    			attr_dev(button2, "class", "cancel-button svelte-i5xq7v");
    			add_location(button2, file$1, 422, 8, 11976);
    			attr_dev(div6, "class", "import-cancel-buttons svelte-i5xq7v");
    			add_location(div6, file$1, 408, 6, 11585);
    			attr_dev(div7, "class", "import-cancel-buttons-container svelte-i5xq7v");
    			add_location(div7, file$1, 407, 4, 11533);
    			attr_dev(div8, "class", "shape-selector-library svelte-i5xq7v");
    			add_location(div8, file$1, 351, 2, 9507);
    			attr_dev(div9, "class", "shape-selector-library-dialog svelte-i5xq7v");
    			add_location(div9, file$1, 346, 0, 9399);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div8);
    			append_dev(div8, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, button0);
    			append_dev(button0, img);
    			/*div0_binding*/ ctx[9](div0);
    			append_dev(div8, t2);
    			append_dev(div8, div5);
    			append_dev(div5, div1);
    			append_dev(div1, input);
    			append_dev(div5, t3);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div2, null);
    				}
    			}

    			append_dev(div8, t4);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, button1);
    			append_dev(div6, t6);
    			append_dev(div6, button2);
    			/*div9_binding*/ ctx[17](div9);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(/*closeLibrary*/ ctx[0])) /*closeLibrary*/ ctx[0].apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(input, "input", /*input_handler*/ ctx[10], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[16], false, false, false, false),
    					listen_dev(
    						button2,
    						"click",
    						function () {
    							if (is_function(/*closeLibrary*/ ctx[0])) /*closeLibrary*/ ctx[0].apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (!current || dirty & /*searchTerm*/ 32 && input.value !== /*searchTerm*/ ctx[5]) {
    				prop_dev(input, "value", /*searchTerm*/ ctx[5]);
    			}

    			if (dirty & /*selectedItemIds, filteredShapes, ShapeSelectorLibrary*/ 324) {
    				each_value = /*filteredShapes*/ ctx[6];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div2, destroy_block, create_each_block$1, null, get_each_context$1);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (!div9_transition) div9_transition = create_bidirectional_transition(div9, fade, { duration: 500 }, true);
    				div9_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div9_transition) div9_transition = create_bidirectional_transition(div9, fade, { duration: 500 }, false);
    			div9_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div9);
    			/*div0_binding*/ ctx[9](null);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			/*div9_binding*/ ctx[17](null);
    			if (detaching && div9_transition) div9_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LibraryDialog', slots, []);
    	let dialog;
    	let header;
    	let ShapeSelectorLibrary;
    	let searchTerm;
    	let currentType;
    	let filteredShapes = [];
    	let shapes = [];
    	let selectedItemIds = [];
    	let { closeLibrary } = $$props;
    	let { addNewShapes } = $$props;

    	// Create writable stores for shapes, filteredShapes, and selectedItemIds
    	const shapesStore = writable([]);

    	const filteredShapesStore = writable([]);
    	const selectedItemIdsStore = writable([]);
    	const importButtonSelectedStore = writable(false);

    	// Initialize ShapeSelectorLibrary and set up update functions when the component is mounted
    	onMount(() => {
    		// Initialize ShapeSelectorLibraryConfig
    		const ShapeSelectorLibraryConfig = {
    			onUpdateShapes: newShapes => {
    				shapesStore.set(newShapes);
    			},
    			onUpdateFilteredShapes: newFilteredShapes => {
    				filteredShapesStore.set(newFilteredShapes);
    			},
    			onUpdateSelectedItemIds: newSelectedItemIds => {
    				selectedItemIdsStore.set(newSelectedItemIds);
    			},
    			onUpdateImportButtonSelected: newImportButtonSelected => {
    				importButtonSelectedStore.set(newImportButtonSelected);
    			}
    		};

    		// Initialize ShapeSelectorLibrary
    		$$invalidate(2, ShapeSelectorLibrary = new GalapagosShapeSelectorLibrary(document.getElementById('Container'), ShapeSelectorLibraryConfig));

    		let isDown = false;
    		let offset = [0, 0];

    		header.addEventListener(
    			'mousedown',
    			event => {
    				isDown = true;
    				offset = [dialog.offsetLeft - event.clientX, dialog.offsetTop - event.clientY];
    			},
    			true
    		);

    		document.addEventListener(
    			'mouseup',
    			() => {
    				isDown = false;
    			},
    			true
    		);

    		document.addEventListener(
    			'mousemove',
    			event => {
    				event.preventDefault();

    				if (isDown) {
    					$$invalidate(3, dialog.style.left = event.clientX + offset[0] + 'px', dialog);
    					$$invalidate(3, dialog.style.top = event.clientY + offset[1] + 'px', dialog);
    				}
    			},
    			true
    		);
    	});

    	// Subscribe to the stores
    	shapesStore.subscribe(value => {
    		$$invalidate(7, shapes = value);
    	});

    	filteredShapesStore.subscribe(value => {
    		$$invalidate(6, filteredShapes = value);
    	});

    	selectedItemIdsStore.subscribe(value => {
    		$$invalidate(8, selectedItemIds = value);
    	});

    	$$self.$$.on_mount.push(function () {
    		if (closeLibrary === undefined && !('closeLibrary' in $$props || $$self.$$.bound[$$self.$$.props['closeLibrary']])) {
    			console.warn("<LibraryDialog> was created without expected prop 'closeLibrary'");
    		}

    		if (addNewShapes === undefined && !('addNewShapes' in $$props || $$self.$$.bound[$$self.$$.props['addNewShapes']])) {
    			console.warn("<LibraryDialog> was created without expected prop 'addNewShapes'");
    		}
    	});

    	const writable_props = ['closeLibrary', 'addNewShapes'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LibraryDialog> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			header = $$value;
    			$$invalidate(4, header);
    		});
    	}

    	const input_handler = event => ShapeSelectorLibrary.handleSearch(event.target.value);
    	const mouseenter_handler = (shape, each_value, shape_index) => $$invalidate(6, each_value[shape_index].hover = true, filteredShapes);
    	const mouseleave_handler = (shape, each_value, shape_index) => $$invalidate(6, each_value[shape_index].hover = false, filteredShapes);
    	const focus_handler = (shape, each_value, shape_index) => $$invalidate(6, each_value[shape_index].hover = true, filteredShapes);
    	const blur_handler = (shape, each_value, shape_index) => $$invalidate(6, each_value[shape_index].hover = false, filteredShapes);
    	const click_handler = shape => ShapeSelectorLibrary.setSelectedItemId(shape.id);

    	const click_handler_1 = () => {
    		if (selectedItemIds.length > 0) {
    			addNewShapes(shapes.filter(shape => selectedItemIds.includes(shape.id)));
    			closeLibrary();
    		}
    	};

    	function div9_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			dialog = $$value;
    			$$invalidate(3, dialog);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('closeLibrary' in $$props) $$invalidate(0, closeLibrary = $$props.closeLibrary);
    		if ('addNewShapes' in $$props) $$invalidate(1, addNewShapes = $$props.addNewShapes);
    	};

    	$$self.$capture_state = () => ({
    		GalapagosShapeSelectorLibrary,
    		onMount,
    		writable,
    		fade,
    		dialog,
    		header,
    		ShapeSelectorLibrary,
    		searchTerm,
    		currentType,
    		filteredShapes,
    		shapes,
    		selectedItemIds,
    		closeLibrary,
    		addNewShapes,
    		shapesStore,
    		filteredShapesStore,
    		selectedItemIdsStore,
    		importButtonSelectedStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('dialog' in $$props) $$invalidate(3, dialog = $$props.dialog);
    		if ('header' in $$props) $$invalidate(4, header = $$props.header);
    		if ('ShapeSelectorLibrary' in $$props) $$invalidate(2, ShapeSelectorLibrary = $$props.ShapeSelectorLibrary);
    		if ('searchTerm' in $$props) $$invalidate(5, searchTerm = $$props.searchTerm);
    		if ('currentType' in $$props) currentType = $$props.currentType;
    		if ('filteredShapes' in $$props) $$invalidate(6, filteredShapes = $$props.filteredShapes);
    		if ('shapes' in $$props) $$invalidate(7, shapes = $$props.shapes);
    		if ('selectedItemIds' in $$props) $$invalidate(8, selectedItemIds = $$props.selectedItemIds);
    		if ('closeLibrary' in $$props) $$invalidate(0, closeLibrary = $$props.closeLibrary);
    		if ('addNewShapes' in $$props) $$invalidate(1, addNewShapes = $$props.addNewShapes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*ShapeSelectorLibrary*/ 4) {
    			{
    				if (ShapeSelectorLibrary) {
    					$$invalidate(5, searchTerm = ShapeSelectorLibrary.searchTerm);
    					currentType = ShapeSelectorLibrary.currentType;
    					$$invalidate(6, filteredShapes = ShapeSelectorLibrary.filteredShapes);
    					$$invalidate(7, shapes = ShapeSelectorLibrary.shapes);
    					$$invalidate(8, selectedItemIds = ShapeSelectorLibrary.selectedItemIds);
    				}
    			}
    		}
    	};

    	return [
    		closeLibrary,
    		addNewShapes,
    		ShapeSelectorLibrary,
    		dialog,
    		header,
    		searchTerm,
    		filteredShapes,
    		shapes,
    		selectedItemIds,
    		div0_binding,
    		input_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		focus_handler,
    		blur_handler,
    		click_handler,
    		click_handler_1,
    		div9_binding
    	];
    }

    class LibraryDialog extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { closeLibrary: 0, addNewShapes: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LibraryDialog",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get closeLibrary() {
    		throw new Error("<LibraryDialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeLibrary(value) {
    		throw new Error("<LibraryDialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get addNewShapes() {
    		throw new Error("<LibraryDialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set addNewShapes(value) {
    		throw new Error("<LibraryDialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.1 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[39] = list[i];
    	child_ctx[40] = list;
    	child_ctx[41] = i;
    	return child_ctx;
    }

    // (648:2) {#if libraryOpen}
    function create_if_block_1(ctx) {
    	let librarydialog;
    	let current;

    	librarydialog = new LibraryDialog({
    			props: {
    				closeLibrary: /*closeLibrary*/ ctx[12],
    				addNewShapes: /*addNewShapes*/ ctx[13]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(librarydialog.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(librarydialog, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const librarydialog_changes = {};
    			if (dirty[0] & /*closeLibrary*/ 4096) librarydialog_changes.closeLibrary = /*closeLibrary*/ ctx[12];
    			if (dirty[0] & /*addNewShapes*/ 8192) librarydialog_changes.addNewShapes = /*addNewShapes*/ ctx[13];
    			librarydialog.$set(librarydialog_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(librarydialog.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(librarydialog.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(librarydialog, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(648:2) {#if libraryOpen}",
    		ctx
    	});

    	return block;
    }

    // (725:16) {#if importButtonSelected}
    function create_if_block(ctx) {
    	let div;
    	let button0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let t1;
    	let button1;
    	let img1;
    	let img1_src_value;
    	let t2;
    	let div_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			img0 = element("img");
    			t0 = text("Library");
    			t1 = space();
    			button1 = element("button");
    			img1 = element("img");
    			t2 = text("Model");
    			attr_dev(img0, "class", "button-image-left svelte-1o39pry");
    			if (!src_url_equal(img0.src, img0_src_value = "icons/library-icon.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "library");
    			add_location(img0, file, 732, 23, 20589);
    			attr_dev(button0, "class", "dropdown-button library-button svelte-1o39pry");
    			add_location(button0, file, 729, 20, 20430);
    			attr_dev(img1, "class", "button-image-left svelte-1o39pry");
    			if (!src_url_equal(img1.src, img1_src_value = "icons/model-icon.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "model");
    			add_location(img1, file, 741, 23, 20961);
    			attr_dev(button1, "class", "dropdown-button model-button svelte-1o39pry");
    			add_location(button1, file, 738, 20, 20817);
    			attr_dev(div, "class", "dropdown-content svelte-1o39pry");
    			add_location(div, file, 725, 18, 20284);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(button0, img0);
    			append_dev(button0, t0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(button1, img1);
    			append_dev(button1, t2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(/*ShapeSelectorDialog*/ ctx[0].openLibrary())) /*ShapeSelectorDialog*/ ctx[0].openLibrary().apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(button1, "click", console.log('model'), false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: 500 }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: 500 }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_transition) div_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(725:16) {#if importButtonSelected}",
    		ctx
    	});

    	return block;
    }

    // (767:14) {#each filteredShapes as shape (shape.id)}
    function create_each_block(key_1, ctx) {
    	let button2;
    	let div0;
    	let button0;
    	let t0;
    	let button1;
    	let button1_class_value;
    	let button1_disabled_value;
    	let t1;
    	let div3;
    	let div1;
    	let img;
    	let img_src_value;
    	let t2;
    	let div2;
    	let t3_value = /*shape*/ ctx[39].name + "";
    	let t3;
    	let div2_class_value;
    	let t4;
    	let button2_class_value;
    	let scrollContainerIntoView_action;
    	let button2_intro;
    	let mounted;
    	let dispose;

    	function click_handler_3(...args) {
    		return /*click_handler_3*/ ctx[20](/*shape*/ ctx[39], ...args);
    	}

    	function keydown_handler(...args) {
    		return /*keydown_handler*/ ctx[21](/*shape*/ ctx[39], ...args);
    	}

    	function click_handler_4(...args) {
    		return /*click_handler_4*/ ctx[22](/*shape*/ ctx[39], ...args);
    	}

    	function keydown_handler_1(...args) {
    		return /*keydown_handler_1*/ ctx[23](/*shape*/ ctx[39], ...args);
    	}

    	function mouseenter_handler() {
    		return /*mouseenter_handler*/ ctx[24](/*shape*/ ctx[39], /*each_value*/ ctx[40], /*shape_index*/ ctx[41]);
    	}

    	function mouseleave_handler() {
    		return /*mouseleave_handler*/ ctx[25](/*shape*/ ctx[39], /*each_value*/ ctx[40], /*shape_index*/ ctx[41]);
    	}

    	function focus_handler() {
    		return /*focus_handler*/ ctx[26](/*shape*/ ctx[39], /*each_value*/ ctx[40], /*shape_index*/ ctx[41]);
    	}

    	function blur_handler() {
    		return /*blur_handler*/ ctx[27](/*shape*/ ctx[39], /*each_value*/ ctx[40], /*shape_index*/ ctx[41]);
    	}

    	function click_handler_5() {
    		return /*click_handler_5*/ ctx[28](/*shape*/ ctx[39]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			button2 = element("button");
    			div0 = element("div");
    			button0 = element("button");
    			t0 = space();
    			button1 = element("button");
    			t1 = space();
    			div3 = element("div");
    			div1 = element("div");
    			img = element("img");
    			t2 = space();
    			div2 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			attr_dev(button0, "aria-label", "Duplicate shape");
    			attr_dev(button0, "class", "duplicate-icon svelte-1o39pry");
    			set_style(button0, "display", /*shape*/ ctx[39].hover ? 'block' : 'none');
    			set_style(button0, "background-image", "url('icons/duplicate-icon.png')");
    			add_location(button0, file, 787, 20, 22763);
    			attr_dev(button1, "aria-label", "Delete shape");
    			attr_dev(button1, "class", button1_class_value = "delete-icon " + (/*shape*/ ctx[39].deletable ? '' : 'button-disabled') + " svelte-1o39pry");
    			set_style(button1, "display", /*shape*/ ctx[39].hover ? 'block' : 'none');
    			set_style(button1, "background-image", "url('icons/delete-icon.png')");
    			button1.disabled = button1_disabled_value = !/*shape*/ ctx[39].deletable;
    			add_location(button1, file, 805, 20, 23546);
    			attr_dev(div0, "class", "shape-selector-item-buttons svelte-1o39pry");
    			add_location(div0, file, 786, 18, 22701);
    			attr_dev(img, "class", "shape-selector-item-image svelte-1o39pry");
    			if (!src_url_equal(img.src, img_src_value = /*shape*/ ctx[39].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file, 828, 22, 24600);
    			attr_dev(div1, "class", "shape-selector-item-image-div svelte-1o39pry");
    			add_location(div1, file, 827, 20, 24534);

    			attr_dev(div2, "class", div2_class_value = "shape-selector-item-name " + (/*shape*/ ctx[39].id === /*selectedItemId*/ ctx[7]
    			? 'font-selected'
    			: '') + " svelte-1o39pry");

    			add_location(div2, file, 834, 20, 24808);
    			attr_dev(div3, "class", "shape-selector-details svelte-1o39pry");
    			add_location(div3, file, 826, 18, 24477);

    			attr_dev(button2, "class", button2_class_value = "shape-selector-item " + (/*shape*/ ctx[39].id === /*selectedItemId*/ ctx[7]
    			? 'selected'
    			: '') + " " + (/*recentlyImportedShapeIds*/ ctx[8].includes(/*shape*/ ctx[39].id)
    			? 'recently-imported'
    			: '') + " " + (/*shape*/ ctx[39].isDeleting ? 'is-deleting' : '') + " svelte-1o39pry");

    			add_location(button2, file, 767, 16, 21836);
    			this.first = button2;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button2, anchor);
    			append_dev(button2, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t0);
    			append_dev(div0, button1);
    			append_dev(button2, t1);
    			append_dev(button2, div3);
    			append_dev(div3, div1);
    			append_dev(div1, img);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, t3);
    			append_dev(button2, t4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler_3, false, false, false, false),
    					listen_dev(button0, "keydown", keydown_handler, false, false, false, false),
    					listen_dev(button1, "click", click_handler_4, false, false, false, false),
    					listen_dev(button1, "keydown", keydown_handler_1, false, false, false, false),
    					action_destroyer(scrollContainerIntoView_action = /*scrollContainerIntoView*/ ctx[14].call(null, button2, /*recentlyImportedShapeIds*/ ctx[8].includes(/*shape*/ ctx[39].id))),
    					listen_dev(button2, "mouseenter", mouseenter_handler, false, false, false, false),
    					listen_dev(button2, "mouseleave", mouseleave_handler, false, false, false, false),
    					listen_dev(button2, "focus", focus_handler, false, false, false, false),
    					listen_dev(button2, "blur", blur_handler, false, false, false, false),
    					listen_dev(button2, "click", click_handler_5, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*filteredShapes*/ 64) {
    				set_style(button0, "display", /*shape*/ ctx[39].hover ? 'block' : 'none');
    			}

    			if (dirty[0] & /*filteredShapes*/ 64 && button1_class_value !== (button1_class_value = "delete-icon " + (/*shape*/ ctx[39].deletable ? '' : 'button-disabled') + " svelte-1o39pry")) {
    				attr_dev(button1, "class", button1_class_value);
    			}

    			if (dirty[0] & /*filteredShapes*/ 64) {
    				set_style(button1, "display", /*shape*/ ctx[39].hover ? 'block' : 'none');
    			}

    			if (dirty[0] & /*filteredShapes*/ 64 && button1_disabled_value !== (button1_disabled_value = !/*shape*/ ctx[39].deletable)) {
    				prop_dev(button1, "disabled", button1_disabled_value);
    			}

    			if (dirty[0] & /*filteredShapes*/ 64 && !src_url_equal(img.src, img_src_value = /*shape*/ ctx[39].image)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty[0] & /*filteredShapes*/ 64 && t3_value !== (t3_value = /*shape*/ ctx[39].name + "")) set_data_dev(t3, t3_value);

    			if (dirty[0] & /*filteredShapes, selectedItemId*/ 192 && div2_class_value !== (div2_class_value = "shape-selector-item-name " + (/*shape*/ ctx[39].id === /*selectedItemId*/ ctx[7]
    			? 'font-selected'
    			: '') + " svelte-1o39pry")) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (dirty[0] & /*filteredShapes, selectedItemId, recentlyImportedShapeIds*/ 448 && button2_class_value !== (button2_class_value = "shape-selector-item " + (/*shape*/ ctx[39].id === /*selectedItemId*/ ctx[7]
    			? 'selected'
    			: '') + " " + (/*recentlyImportedShapeIds*/ ctx[8].includes(/*shape*/ ctx[39].id)
    			? 'recently-imported'
    			: '') + " " + (/*shape*/ ctx[39].isDeleting ? 'is-deleting' : '') + " svelte-1o39pry")) {
    				attr_dev(button2, "class", button2_class_value);
    			}

    			if (scrollContainerIntoView_action && is_function(scrollContainerIntoView_action.update) && dirty[0] & /*recentlyImportedShapeIds, filteredShapes*/ 320) scrollContainerIntoView_action.update.call(null, /*recentlyImportedShapeIds*/ ctx[8].includes(/*shape*/ ctx[39].id));
    		},
    		i: function intro(local) {
    			if (!button2_intro) {
    				add_render_callback(() => {
    					button2_intro = create_in_transition(button2, fade, {});
    					button2_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(767:14) {#each filteredShapes as shape (shape.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div14;
    	let t0;
    	let div13;
    	let div12;
    	let div1;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let h2;
    	let t3;
    	let button0;
    	let img1;
    	let img1_src_value;
    	let t4;
    	let div11;
    	let div6;
    	let h3;
    	let t6;
    	let div5;
    	let div2;
    	let button1;
    	let img2;
    	let img2_src_value;
    	let t7;
    	let button1_class_value;
    	let t8;
    	let button2;
    	let img3;
    	let img3_src_value;
    	let t9;
    	let button2_class_value;
    	let t10;
    	let div4;
    	let button3;
    	let img4;
    	let img4_src_value;
    	let t11;
    	let t12;
    	let div3;
    	let button4;
    	let img5;
    	let img5_src_value;
    	let t13;
    	let button4_class_value;
    	let t14;
    	let t15;
    	let div7;
    	let input;
    	let t16;
    	let div10;
    	let div9;
    	let div8;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*libraryOpen*/ ctx[11] && create_if_block_1(ctx);
    	let if_block1 = /*importButtonSelected*/ ctx[10] && create_if_block(ctx);
    	let each_value = /*filteredShapes*/ ctx[6];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*shape*/ ctx[39].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div14 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div13 = element("div");
    			div12 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "Shape Editor";
    			t3 = space();
    			button0 = element("button");
    			img1 = element("img");
    			t4 = space();
    			div11 = element("div");
    			div6 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Selection Mode";
    			t6 = space();
    			div5 = element("div");
    			div2 = element("div");
    			button1 = element("button");
    			img2 = element("img");
    			t7 = text("Turtle");
    			t8 = space();
    			button2 = element("button");
    			img3 = element("img");
    			t9 = text("Link");
    			t10 = space();
    			div4 = element("div");
    			button3 = element("button");
    			img4 = element("img");
    			t11 = text("Create New");
    			t12 = space();
    			div3 = element("div");
    			button4 = element("button");
    			img5 = element("img");
    			t13 = text("Import From...");
    			t14 = space();
    			if (if_block1) if_block1.c();
    			t15 = space();
    			div7 = element("div");
    			input = element("input");
    			t16 = space();
    			div10 = element("div");
    			div9 = element("div");
    			div8 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (!src_url_equal(img0.src, img0_src_value = "icons/header-logo.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "header logo");
    			attr_dev(img0, "class", "svelte-1o39pry");
    			add_location(img0, file, 658, 10, 17831);
    			attr_dev(h2, "class", "svelte-1o39pry");
    			add_location(h2, file, 659, 10, 17895);
    			attr_dev(div0, "class", "shape-selector-header-logo svelte-1o39pry");
    			add_location(div0, file, 657, 8, 17780);
    			if (!src_url_equal(img1.src, img1_src_value = "icons/close-button.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "X");
    			attr_dev(img1, "class", "svelte-1o39pry");
    			add_location(img1, file, 665, 10, 18061);
    			attr_dev(button0, "class", "close-button svelte-1o39pry");
    			add_location(button0, file, 661, 8, 17940);
    			attr_dev(div1, "class", "shape-selector-header svelte-1o39pry");
    			add_location(div1, file, 656, 6, 17717);
    			attr_dev(h3, "class", "svelte-1o39pry");
    			add_location(h3, file, 670, 10, 18219);
    			attr_dev(img2, "class", "button-image-left svelte-1o39pry");
    			if (!src_url_equal(img2.src, img2_src_value = "icons/turtle-icon.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "turtle button");
    			add_location(img2, file, 681, 17, 18671);

    			attr_dev(button1, "class", button1_class_value = "turtle-button " + (/*currentType*/ ctx[5] === 'turtle'
    			? 'selected-button'
    			: 'unselected-button') + " svelte-1o39pry");

    			add_location(button1, file, 673, 14, 18346);
    			attr_dev(img3, "class", "button-image-left svelte-1o39pry");
    			if (!src_url_equal(img3.src, img3_src_value = "icons/link-icon.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "link button");
    			add_location(img3, file, 695, 17, 19184);

    			attr_dev(button2, "class", button2_class_value = "link-button " + (/*currentType*/ ctx[5] === 'link'
    			? 'selected-button'
    			: 'unselected-button') + " svelte-1o39pry");

    			add_location(button2, file, 687, 14, 18867);
    			attr_dev(div2, "class", "mode-selector-buttons svelte-1o39pry");
    			add_location(div2, file, 672, 12, 18296);
    			attr_dev(img4, "class", "button-image-right svelte-1o39pry");
    			if (!src_url_equal(img4.src, img4_src_value = "icons/create-new-icon.png")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "create new");
    			add_location(img4, file, 706, 17, 19570);
    			attr_dev(button3, "class", "create-new-button svelte-1o39pry");
    			add_location(button3, file, 703, 14, 19442);
    			attr_dev(img5, "class", "button-image-right svelte-1o39pry");
    			if (!src_url_equal(img5.src, img5_src_value = "icons/import-icon.png")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "import");
    			add_location(img5, file, 718, 19, 20029);
    			attr_dev(button4, "class", button4_class_value = "import-shapes-button " + (/*importButtonSelected*/ ctx[10] ? 'clicked' : '') + " svelte-1o39pry");
    			add_location(button4, file, 713, 16, 19811);
    			attr_dev(div3, "class", "dropdown svelte-1o39pry");
    			add_location(div3, file, 712, 14, 19772);
    			attr_dev(div4, "class", "shape-selector-buttons svelte-1o39pry");
    			add_location(div4, file, 702, 12, 19391);
    			attr_dev(div5, "class", "selector-buttons svelte-1o39pry");
    			add_location(div5, file, 671, 10, 18253);
    			attr_dev(div6, "class", "mode-selector svelte-1o39pry");
    			add_location(div6, file, 669, 8, 18181);
    			input.value = /*searchTerm*/ ctx[4];
    			attr_dev(input, "placeholder", "Search");
    			set_style(input, "background-image", "url('icons/search-icon.png')");
    			attr_dev(input, "class", "svelte-1o39pry");
    			add_location(input, file, 754, 10, 21336);
    			attr_dev(div7, "class", "shape-selector-search svelte-1o39pry");
    			add_location(div7, file, 753, 8, 21290);
    			attr_dev(div8, "class", "shape-selector-grid-inner svelte-1o39pry");
    			add_location(div8, file, 765, 12, 21701);
    			attr_dev(div9, "class", "scrollbar-wrapper svelte-1o39pry");
    			add_location(div9, file, 764, 10, 21657);
    			attr_dev(div10, "class", "shape-selector-grid svelte-1o39pry");
    			add_location(div10, file, 763, 8, 21613);
    			attr_dev(div11, "class", "inner-container svelte-1o39pry");
    			add_location(div11, file, 668, 6, 18143);
    			attr_dev(div12, "class", "shape-selector svelte-1o39pry");
    			add_location(div12, file, 655, 4, 17682);
    			attr_dev(div13, "class", "shape-selector-dialog svelte-1o39pry");
    			set_style(div13, "display", /*dialogOpen*/ ctx[9] ? 'block' : 'none', 1);
    			add_location(div13, file, 650, 2, 17547);
    			add_location(div14, file, 646, 0, 17459);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div14, anchor);
    			if (if_block0) if_block0.m(div14, null);
    			append_dev(div14, t0);
    			append_dev(div14, div13);
    			append_dev(div13, div12);
    			append_dev(div12, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img0);
    			append_dev(div0, t1);
    			append_dev(div0, h2);
    			append_dev(div1, t3);
    			append_dev(div1, button0);
    			append_dev(button0, img1);
    			/*div1_binding*/ ctx[16](div1);
    			append_dev(div12, t4);
    			append_dev(div12, div11);
    			append_dev(div11, div6);
    			append_dev(div6, h3);
    			append_dev(div6, t6);
    			append_dev(div6, div5);
    			append_dev(div5, div2);
    			append_dev(div2, button1);
    			append_dev(button1, img2);
    			append_dev(button1, t7);
    			append_dev(div2, t8);
    			append_dev(div2, button2);
    			append_dev(button2, img3);
    			append_dev(button2, t9);
    			append_dev(div5, t10);
    			append_dev(div5, div4);
    			append_dev(div4, button3);
    			append_dev(button3, img4);
    			append_dev(button3, t11);
    			append_dev(div4, t12);
    			append_dev(div4, div3);
    			append_dev(div3, button4);
    			append_dev(button4, img5);
    			append_dev(button4, t13);
    			append_dev(div3, t14);
    			if (if_block1) if_block1.m(div3, null);
    			append_dev(div11, t15);
    			append_dev(div11, div7);
    			append_dev(div7, input);
    			append_dev(div11, t16);
    			append_dev(div11, div10);
    			append_dev(div10, div9);
    			append_dev(div9, div8);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div8, null);
    				}
    			}

    			/*div8_binding*/ ctx[29](div8);
    			/*div13_binding*/ ctx[30](div13);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[15], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[17], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[18], false, false, false, false),
    					listen_dev(
    						button3,
    						"click",
    						function () {
    							if (is_function(/*ShapeSelectorDialog*/ ctx[0].createShape())) /*ShapeSelectorDialog*/ ctx[0].createShape().apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button4,
    						"click",
    						function () {
    							if (is_function(/*ShapeSelectorDialog*/ ctx[0].importShapes())) /*ShapeSelectorDialog*/ ctx[0].importShapes().apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(input, "input", /*input_handler*/ ctx[19], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (/*libraryOpen*/ ctx[11]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*libraryOpen*/ 2048) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div14, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*currentType*/ 32 && button1_class_value !== (button1_class_value = "turtle-button " + (/*currentType*/ ctx[5] === 'turtle'
    			? 'selected-button'
    			: 'unselected-button') + " svelte-1o39pry")) {
    				attr_dev(button1, "class", button1_class_value);
    			}

    			if (!current || dirty[0] & /*currentType*/ 32 && button2_class_value !== (button2_class_value = "link-button " + (/*currentType*/ ctx[5] === 'link'
    			? 'selected-button'
    			: 'unselected-button') + " svelte-1o39pry")) {
    				attr_dev(button2, "class", button2_class_value);
    			}

    			if (!current || dirty[0] & /*importButtonSelected*/ 1024 && button4_class_value !== (button4_class_value = "import-shapes-button " + (/*importButtonSelected*/ ctx[10] ? 'clicked' : '') + " svelte-1o39pry")) {
    				attr_dev(button4, "class", button4_class_value);
    			}

    			if (/*importButtonSelected*/ ctx[10]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*importButtonSelected*/ 1024) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div3, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*searchTerm*/ 16 && input.value !== /*searchTerm*/ ctx[4]) {
    				prop_dev(input, "value", /*searchTerm*/ ctx[4]);
    			}

    			if (dirty[0] & /*filteredShapes, selectedItemId, recentlyImportedShapeIds, ShapeSelectorDialog*/ 449) {
    				each_value = /*filteredShapes*/ ctx[6];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div8, destroy_block, create_each_block, null, get_each_context);
    			}

    			if (!current || dirty[0] & /*dialogOpen*/ 512) {
    				set_style(div13, "display", /*dialogOpen*/ ctx[9] ? 'block' : 'none', 1);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div14);
    			if (if_block0) if_block0.d();
    			/*div1_binding*/ ctx[16](null);
    			if (if_block1) if_block1.d();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			/*div8_binding*/ ctx[29](null);
    			/*div13_binding*/ ctx[30](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let dialog;
    	let header;
    	let container;
    	let ShapeSelectorDialog;
    	let searchTerm;
    	let currentType;
    	let filteredShapes = [];
    	let shapes = [];
    	let selectedItemId = null;
    	let recentlyImportedShapeIds = [];
    	let dialogOpen = true;
    	let importButtonSelected = false;
    	let libraryOpen = false;
    	let closeLibrary;
    	let addNewShapes;

    	// Create writable stores for shapes, filteredShapes, and selectedItemId
    	const shapesStore = writable([]);

    	const filteredShapesStore = writable([]);
    	const selectedItemIdStore = writable(null);
    	const recentlyImportedShapeIdsStore = writable([]);
    	const dialogOpenStore = writable(true);
    	const importButtonSelectedStore = writable(false);
    	const libraryOpenStore = writable(false);

    	// Initialize ShapeSelectorDialog and set up update functions when the component is mounted
    	onMount(() => {
    		// Initialize ShapeSelectorDialogConfig
    		const ShapeSelectorDialogConfig = {
    			onUpdateShapes: newShapes => {
    				shapesStore.set(newShapes);
    			},
    			onUpdateFilteredShapes: newFilteredShapes => {
    				filteredShapesStore.set(newFilteredShapes);
    			},
    			onUpdateSelectedItemId: newSelectedItemId => {
    				selectedItemIdStore.set(newSelectedItemId);
    			},
    			onUpdateDialogOpen: newDialogOpen => {
    				dialogOpenStore.set(newDialogOpen);
    			},
    			onUpdateImportButtonSelected: newImportButtonSelected => {
    				importButtonSelectedStore.set(newImportButtonSelected);
    			},
    			onUpdateLibraryOpen: newLibraryOpen => {
    				libraryOpenStore.set(newLibraryOpen);
    			},
    			onUpdateRecentlyImportedShapes: newRecentlyImportedShapeIds => {
    				recentlyImportedShapeIdsStore.set(newRecentlyImportedShapeIds);
    			}
    		};

    		// Initialize ShapeSelectorDialog
    		$$invalidate(0, ShapeSelectorDialog = new GalapagosShapeSelectorDialog(document.getElementById('Container'), ShapeSelectorDialogConfig));

    		let isDown = false;
    		let offset = [0, 0];

    		$$invalidate(12, closeLibrary = () => {
    			ShapeSelectorDialog.closeLibrary();
    		});

    		$$invalidate(13, addNewShapes = shapes => {
    			ShapeSelectorDialog.addNewShapes(shapes);
    		});

    		header.addEventListener(
    			'mousedown',
    			event => {
    				isDown = true;
    				offset = [dialog.offsetLeft - event.clientX, dialog.offsetTop - event.clientY];
    			},
    			true
    		);

    		document.addEventListener(
    			'mouseup',
    			() => {
    				isDown = false;
    			},
    			true
    		);

    		document.addEventListener(
    			'mousemove',
    			event => {
    				event.preventDefault();

    				if (isDown) {
    					$$invalidate(1, dialog.style.left = event.clientX + offset[0] + 'px', dialog);
    					$$invalidate(1, dialog.style.top = event.clientY + offset[1] + 'px', dialog);
    				}
    			},
    			true
    		);
    	});

    	// scroll into view function
    	function scrollContainerIntoView(node, newlyAdded) {
    		if (newlyAdded) {
    			let relativeTop = node.offsetTop - container.offsetTop;

    			if (relativeTop < container.scrollTop || relativeTop > container.scrollTop + container.offsetHeight) {
    				$$invalidate(3, container.scrollTop = relativeTop, container);
    			}
    		}
    	}

    	// Subscribe to the stores
    	shapesStore.subscribe(value => {
    		shapes = value;
    	});

    	filteredShapesStore.subscribe(value => {
    		$$invalidate(6, filteredShapes = value);
    	});

    	selectedItemIdStore.subscribe(value => {
    		$$invalidate(7, selectedItemId = value);
    	});

    	dialogOpenStore.subscribe(value => {
    		$$invalidate(9, dialogOpen = value);
    	});

    	importButtonSelectedStore.subscribe(value => {
    		$$invalidate(10, importButtonSelected = value);
    	});

    	libraryOpenStore.subscribe(value => {
    		$$invalidate(11, libraryOpen = value);
    	});

    	recentlyImportedShapeIdsStore.subscribe(value => {
    		$$invalidate(8, recentlyImportedShapeIds = value);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => ShapeSelectorDialog.toggleDialog();

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			header = $$value;
    			$$invalidate(2, header);
    		});
    	}

    	const click_handler_1 = () => {
    		$$invalidate(5, currentType = 'turtle');
    		ShapeSelectorDialog.filterShapes('turtle');
    	};

    	const click_handler_2 = () => {
    		$$invalidate(5, currentType = 'link');
    		ShapeSelectorDialog.filterShapes('link');
    	};

    	const input_handler = event => ShapeSelectorDialog.handleSearch(event.target.value);

    	const click_handler_3 = (shape, event) => {
    		event.stopPropagation();
    		ShapeSelectorDialog.duplicateShape(shape.id);
    	};

    	const keydown_handler = (shape, event) => {
    		if (event.key === 'Enter') {
    			event.stopPropagation();
    			ShapeSelectorDialog.duplicateShape(shape.id);
    		}
    	};

    	const click_handler_4 = (shape, event) => {
    		event.stopPropagation();
    		ShapeSelectorDialog.deleteShape(shape.id);
    	};

    	const keydown_handler_1 = (shape, event) => {
    		if (event.key === 'Enter') {
    			event.stopPropagation();
    			ShapeSelectorDialog.deleteShape(shape.id);
    		}
    	};

    	const mouseenter_handler = (shape, each_value, shape_index) => $$invalidate(6, each_value[shape_index].hover = true, filteredShapes);
    	const mouseleave_handler = (shape, each_value, shape_index) => $$invalidate(6, each_value[shape_index].hover = false, filteredShapes);
    	const focus_handler = (shape, each_value, shape_index) => $$invalidate(6, each_value[shape_index].hover = true, filteredShapes);
    	const blur_handler = (shape, each_value, shape_index) => $$invalidate(6, each_value[shape_index].hover = false, filteredShapes);
    	const click_handler_5 = shape => ShapeSelectorDialog.setSelectedItemId(shape.id);

    	function div8_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			container = $$value;
    			$$invalidate(3, container);
    		});
    	}

    	function div13_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			dialog = $$value;
    			$$invalidate(1, dialog);
    		});
    	}

    	$$self.$capture_state = () => ({
    		GalapagosShapeSelectorDialog,
    		LibraryDialog,
    		onMount,
    		writable,
    		fade,
    		dialog,
    		header,
    		container,
    		ShapeSelectorDialog,
    		searchTerm,
    		currentType,
    		filteredShapes,
    		shapes,
    		selectedItemId,
    		recentlyImportedShapeIds,
    		dialogOpen,
    		importButtonSelected,
    		libraryOpen,
    		closeLibrary,
    		addNewShapes,
    		shapesStore,
    		filteredShapesStore,
    		selectedItemIdStore,
    		recentlyImportedShapeIdsStore,
    		dialogOpenStore,
    		importButtonSelectedStore,
    		libraryOpenStore,
    		scrollContainerIntoView
    	});

    	$$self.$inject_state = $$props => {
    		if ('dialog' in $$props) $$invalidate(1, dialog = $$props.dialog);
    		if ('header' in $$props) $$invalidate(2, header = $$props.header);
    		if ('container' in $$props) $$invalidate(3, container = $$props.container);
    		if ('ShapeSelectorDialog' in $$props) $$invalidate(0, ShapeSelectorDialog = $$props.ShapeSelectorDialog);
    		if ('searchTerm' in $$props) $$invalidate(4, searchTerm = $$props.searchTerm);
    		if ('currentType' in $$props) $$invalidate(5, currentType = $$props.currentType);
    		if ('filteredShapes' in $$props) $$invalidate(6, filteredShapes = $$props.filteredShapes);
    		if ('shapes' in $$props) shapes = $$props.shapes;
    		if ('selectedItemId' in $$props) $$invalidate(7, selectedItemId = $$props.selectedItemId);
    		if ('recentlyImportedShapeIds' in $$props) $$invalidate(8, recentlyImportedShapeIds = $$props.recentlyImportedShapeIds);
    		if ('dialogOpen' in $$props) $$invalidate(9, dialogOpen = $$props.dialogOpen);
    		if ('importButtonSelected' in $$props) $$invalidate(10, importButtonSelected = $$props.importButtonSelected);
    		if ('libraryOpen' in $$props) $$invalidate(11, libraryOpen = $$props.libraryOpen);
    		if ('closeLibrary' in $$props) $$invalidate(12, closeLibrary = $$props.closeLibrary);
    		if ('addNewShapes' in $$props) $$invalidate(13, addNewShapes = $$props.addNewShapes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*ShapeSelectorDialog*/ 1) {
    			{
    				if (ShapeSelectorDialog) {
    					$$invalidate(4, searchTerm = ShapeSelectorDialog.searchTerm);
    					$$invalidate(5, currentType = ShapeSelectorDialog.currentType);
    					$$invalidate(6, filteredShapes = ShapeSelectorDialog.filteredShapes);
    					shapes = ShapeSelectorDialog.shapes;
    					$$invalidate(7, selectedItemId = ShapeSelectorDialog.selectedItemId);
    					$$invalidate(8, recentlyImportedShapeIds = ShapeSelectorDialog.recentlyImportedShapeIds);
    					$$invalidate(9, dialogOpen = ShapeSelectorDialog.dialogOpen);
    					$$invalidate(10, importButtonSelected = ShapeSelectorDialog.importButtonSelected);
    					$$invalidate(11, libraryOpen = ShapeSelectorDialog.libraryOpen);
    				}
    			}
    		}
    	};

    	return [
    		ShapeSelectorDialog,
    		dialog,
    		header,
    		container,
    		searchTerm,
    		currentType,
    		filteredShapes,
    		selectedItemId,
    		recentlyImportedShapeIds,
    		dialogOpen,
    		importButtonSelected,
    		libraryOpen,
    		closeLibrary,
    		addNewShapes,
    		scrollContainerIntoView,
    		click_handler,
    		div1_binding,
    		click_handler_1,
    		click_handler_2,
    		input_handler,
    		click_handler_3,
    		keydown_handler,
    		click_handler_4,
    		keydown_handler_1,
    		mouseenter_handler,
    		mouseleave_handler,
    		focus_handler,
    		blur_handler,
    		click_handler_5,
    		div8_binding,
    		div13_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        name: 'world',
      },
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
