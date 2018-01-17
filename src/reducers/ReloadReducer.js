export default (state, action) => {
	switch (action.type) {
		case 'reload':
			return { ...state, cargando: action.payload };
		default:
			if (state === undefined) {
				return null;
			}
			return state;
	}
};
