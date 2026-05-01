class FakeAction {
  constructor(amount) {
    this.amount = amount;
  }

  impl(model) {
    const effect = model.add(this.amount);
    return effect;
  }
}
export default FakeAction;
