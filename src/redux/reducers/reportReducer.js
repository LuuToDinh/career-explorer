const initialData = {
	totalInterview: null,
	totalInterviewToday: null,
	totalCVApply: null,
	ratioCVApply: {},
	accessDay: {},
};
export const reportReducer = (state = initialData, action = {}) => {
	const { type, payload } = action;
	// console.log('payload', payload);
	switch (type) {
		case 'GET_TOTAL_INTERVIEW':
			return {
				...state,
				totalInterview: payload,
			};
		case 'GET_TOTAL_INTERVIEW_TODAY':
			return {
				...state,
				totalInterviewToday: payload,
			};
		case 'GET_TOTAL_CV_APPLY':
			return {
				...state,
				totalCVApply: payload,
			};
		case 'GET_RATIO_CV_APPLY':
			return {
				...state,
				ratioCVApply: payload,
			};
		case 'GET_ACCESS_DAY':
			return {
				...state,
				accessDay: payload,
			};

		default:
			return state;
	}
};
