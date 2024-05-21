/* Gets data from state
 * Accepts btn, arr and options arguments
 */
export default (btn, arr) => {
  const { id } = btn.dataset;
  const data = arr.find((item) => item.id === +id);
  return data;
};
