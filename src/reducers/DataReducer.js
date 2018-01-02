export default (state, action) => {
	switch (action.type) {
		case 'iconos_y_usuario':
			return action.payload;
		default: 
			if (state === undefined) {
				return null;
			}
			return state;
	}
};
