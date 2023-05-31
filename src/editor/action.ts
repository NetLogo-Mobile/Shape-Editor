import type { JSONShape } from "./json_shape";

interface Action {
    before: JSONShape;
    after: JSONShape;
}
