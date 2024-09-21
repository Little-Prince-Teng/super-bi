import baseSchema from "./base/schema";
import mediaSchema from "./media/schema";
import visualSchema from "./visual/schema";

const schema = {
	...baseSchema,
	...mediaSchema,
	...visualSchema,
};

export default schema;