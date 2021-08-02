const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Withdraw'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <br></br><input id="number-input" type="number" width="200" onChange={onChange}></input>
      <br></br><input type="submit" disabled={!isValid} width="200" value="Confirm" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  // let deposit = 0; // state of this transaction
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(100);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(true);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === 'Withdraw' && Number(event.target.value) > totalState) {
      alert("Nice try 😏 You are attempting to withdraw beyond your means, please amend your amount.")
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));

  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(true);
    if ((isDeposit === true) && newTotal >=70){
    alert("Success! You are building good saving habits, invest it wisely 🧐.")};
    document.getElementById('number-input').value=null;
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <h2 id="total">{status}</h2>
        <label>Please select an action to perform as follows: </label>
        <br></br>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" disabled={false} value="Select">select below</option>
          <option id="deposit-selection" value="Deposit">
            Deposit 💹
          </option>
          <option id="cashback-selection" value="Withdraw">
            Withdraw 🤑
          </option>
        </select><br></br>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          ></ATMDeposit>
        )}
      </>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
