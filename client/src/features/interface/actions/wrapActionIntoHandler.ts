import { AppThunk } from "store/store";
import { setActionOn } from "store/reducers/tableReducer";

const wrapActionIntoSetActionOn =
  (action: AppThunk): AppThunk =>
  async (dispatch) => {
    await dispatch(setActionOn(true));
    await dispatch(action);
    await dispatch(setActionOn(false));
  };

export { wrapActionIntoSetActionOn };
