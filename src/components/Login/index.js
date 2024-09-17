import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

class Login extends Component {
  state = {
    habitName: "",
    frequency: "",
    errMsg: false,
    habitList: [],
  };

  componentDidMount() {
    const list = localStorage.getItem("habitlist");
    if (list !== null) {
      this.setState({ habitList: list });
    }
  }

  handleHabitname = (event) => {
    this.setState({ habitName: event.target.value });
  };

  handleFrequency = (event) => {
    this.setState({ frequency: event.target.value });
  };

  formOnSubmit = (event) => {
    event.preventDefault();
    const { habitName, frequency, habitList } = this.state;
    if (habitName !== "" && frequency !== "") {
      const newObj = {
        id: uuidv4(),
        habitName,
        frequency,
        isChecked: false,
      };
      const updatedList = [...habitList, newObj];

      this.setState((prevState) => ({
        habitName: "",
        frequency: "",
        errMsg: false,
        habitList: [...prevState.habitList, newObj],
      }));

      const habitItem = localStorage.setItem("habitlist", updatedList);
    } else {
      this.setState({ errMsg: true });
    }
  };

  handleCheckBox = (event, id) => {
    const { habitList } = this.state;
    const updatedList = habitList.filter((each) => {
      if (each.id === id) {
        return {
          ...each,
          isChecked: !each.isChecked,
        };
      }
      return each;
    });
  };

  handleDeleteHabit = (id) => {
    localStorage.removeItem(habitItem);
  };

  render() {
    const { frequency, habitName, habitList, errMsg } = this.state;
    console.log(habitList);
    return (
      <div className="login-container">
        <form onSubmit={this.formOnSubmit} className="form-container">
          <h1>Please Enter Your Details</h1>
          <div className="input-container">
            <label htmlFor="habitname">Habit Name: </label>
            <input
              value={habitName}
              onChange={this.handleHabitname}
              placeholder="eg: Exercise, Meditation"
              id="habitname"
              type="text"
            />
          </div>
          <div className="input-container">
            <label htmlFor="frequency">Frequency: </label>
            <input
              value={frequency}
              onChange={this.handleFrequency}
              placeholder="eg: daily, weekly"
              id="frequency"
              type="text"
            />
          </div>
          <button type="submit">Submit</button>
          {errMsg && <p style={{ color: "red" }}>*{errMsg}</p>}
        </form>
        <hr />
        <div className="habit-list-container">
          {habitList.length === 0 ? (
            <div>
              <h1> No Habits Yet</h1>
            </div>
          ) : (
            <ul>
              {habitList.map((each) => (
                <li key={each.id}>
                  <div>
                    <div className="card">
                      <p className="heading">Habit Name:</p>
                      <p className="para">{each.habitName}</p>
                    </div>
                    <div className="card">
                      <p className="heading">Frequency:</p>
                      <p className="para">{each.frequency}</p>
                    </div>
                  </div>
                  <input
                    className="check-box"
                    type="checkbox"
                    value={each.isChecked}
                    onChange={(id) => this.handleCheckBox}
                  />
                      <button
                    onClick={(id) => this.handleDeleteHabit}
                    type="button"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
