import { call, put, select } from "redux-saga/effects";
import { privateRequest } from "@helpers/requestHelper";
import { getInitialAmountSuccess } from "@components/spendings/spendingDashboard/actions";

export default function* monthlyStatHelper (res, payload) {
  const from = yield select(state => state.dateRangeReducer.dateRange.from);
  const monthlyStats = yield call(privateRequest, `/monthlystats?userID=${payload.userID}&from=${from}`);
  yield put(getInitialAmountSuccess(res.data, monthlyStats.data));
};
