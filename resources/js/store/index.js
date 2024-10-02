import { createStore } from "vuex";
import auth from "./modules/auth";
import notes from "./modules/notes";

import tags from "./modules/tags";

export default createStore({
    modules: {
        auth,
        notes,
        tags,
    },
});
