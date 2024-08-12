export const applyTextColor = (color) => (state, dispatch) => {
    const { schema, selection } = state;
    const markType = schema.marks.text_color;

    console.log("applyTextColor called with color:", color);
    console.log("Current selection:", selection);

    if (selection.empty) {
        console.log("Selection is empty, cannot apply color.");
        return false;
    } 

    let { from, to } = selection;
    console.log("Applying color from", from, "to", to);

    if (dispatch) {
      const tr = state.tr.addMark(from, to, markType.create({ color }));
      console.log("Transaction created:", tr);
      dispatch(tr.scrollIntoView());
      return true;
    }

    console.log("Dispatch is not available.");
    return false;
};
