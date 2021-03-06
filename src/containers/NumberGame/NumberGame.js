import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import classes from "./NumberGame.module.css";

class NumberGame extends Component {
  state = {
    randomNumber: 0,
    difference: [],
    visibility: "hidden",
    range: 100,
    inpArray: [{ text: "" }],
  };

  componentDidMount() {
    let range = this.state.range;
    let randomNumber = Math.floor(Math.random() * range + 1);
    this.setState({ randomNumber: randomNumber });
  }
  inputChangeHandler = (event, index) => {
    let text = event.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        ...(prevState.inpArray[index].text = text),
      };
    });
  };

  clickHandler = (index) => {
    const range = this.state.range;
    const num = +this.state.inpArray[index].text;
    let arr = [...this.state.inpArray];
    let randomNumber = this.state.randomNumber;
    let diff = Math.abs(randomNumber - num);
    if (diff === 0) {
      randomNumber = Math.floor(Math.random() * range + 1);
      const obj = {
        text: "",
      };
      this.setState({
        visibility: "visible",
        range: range + 100,
        inpArray: arr.concat(obj),
        randomNumber: randomNumber,
      });
      this.setState((prevState) => {
        return {
          ...prevState,
          ...(prevState.difference[index] = diff),
          ...(prevState.inpArray[index].text = ""),
        };
      });
    } else {
      this.setState({ visibility: "visible" });
      this.setState((prevState) => {
        return {
          ...prevState,
          ...(prevState.difference[index] = diff),
          ...(prevState.inpArray[index].text = ""),
        };
      });
    }
  };

  render() {
    const status = (difference) => {
      if (difference === 0) {
        return (
          <h1
            style={{ visibility: this.state.visibility }}
            className={classes.Correct}
          >
            Correct
          </h1>
        );
      } else if (difference >= 1 && difference <= 4) {
        return (
          <h1
            style={{ visibility: this.state.visibility }}
            className={classes.Hot}
          >
            Hot
          </h1>
        );
      } else if (difference >= 5 && difference <= 15) {
        return (
          <h1
            style={{ visibility: this.state.visibility }}
            className={classes.Warm}
          >
            Warm
          </h1>
        );
      } else {
        return (
          <h1
            style={{ visibility: this.state.visibility }}
            className={classes.Cold}
          >
            Cold
          </h1>
        );
      }
    };

    const data = this.state.inpArray.map((ele, index) => {
      return (
        <div key={index}>
          <Input
            changed={(event) => this.inputChangeHandler(event, index)}
            value={ele.text}
            clicked={() => this.clickHandler(index)}
          />
          {status(this.state.difference[index])}
          <hr />
        </div>
      );
    });
    return <div>{data}</div>;
  }
}

export default NumberGame;
