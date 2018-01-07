export default (state, action) => {
	switch (action.type) {
		case 'reloadClases':
			return { ...state, cargando: action.payload };
		default:
			if (state === undefined) {
				return null;
			}
			return state;
	}
};
