import React, {Component} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import CreatableSelect from 'react-select/lib/Creatable';
import Button from '@material-ui/core/Button';
import uuidv1 from 'uuid/v1';
import Paper from '@material-ui/core/Paper';

class App extends Component {

    state = {
        NowtilusUUID: uuidv1(), /*Creating Random UUID "there was no specification what kind of uuid" */
        imdbID: "",
        Title: "",
        Plot: "",
        Released: "",
        Production: "",
        Ratings: [],
        Actors: [],
        Director: [],
        Writer: [],
        Genre: [],
        selectedValues: [],
        loadedData: {}
    }
    /*the function responsible for fetching the data and fill or correct the data in the form */
    loadingData = () => {
        if (this.state.Title.length > 0 && this.state.NowtilusUUID.length > 0 && this.state.Released.length > 0) {
            fetch(`http://www.omdbapi.com/?t=${this.state.Title}&i=${this.state.imdbID}&apikey=32671f58`).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            }).then(data => {
                for (let property in data) {
                    if (property === "Genre") {
                        let selectedValues = []
                        let Genre = data[property].split(",")
                        Genre.forEach(item => {
                            let newGenry = {
                                __isNew__: true,
                                label: item,
                                value: item
                            }
                            selectedValues.push(newGenry)
                        })
                        this.setState({Genre, selectedValues})

                    } else if (property === "Released") { /*I needed to use else if condition because the Date format from the API is different from the date format in the input type */
                        let ReleasedArray = [];
                        let ReleasedData = data[property]
                            .split(" ")
                            .forEach(item => ReleasedArray.unshift(item))

                        const month = [
                            "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
                        ]
                        const monthNumber = [
                            "01","02","03","04","05","06","07","08","09","10","11","12"
                        ]
                        /* converting the date format from 15 Feb 2011   to 2011-02-15 that match the input type date format */
                        month.forEach(item => {
                            if (item === ReleasedArray[1]) {
                                ReleasedArray[1] = monthNumber[month.indexOf(item)]
                            }
                        })
                        let Released = ReleasedArray.join("-")
                        this.setState({Released})
                    } else {
                        this.setState({[property]: data[property]})
                    }

                }

            });

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.Title !== prevState.Title || this.state.Released !== prevState.Released) {
            /*calling the loading data function whenever there is a change in the sate */
            this.loadingData()
        }

    }
    /* Handeling the change of the inputs */
    handelChange = e => {
        this.loadingData()
        if (e.target) {
            if (Array.isArray(this.state[e.target.name])) {
                /* converting the String with "," to an Array */
                const entryArray = e
                    .target
                    .value
                    .split(",")
                this.setState({
                    [e.target.name]: entryArray
                })
            } else {
                this.setState({
                    [e.target.name]: e.target.value
                })
            }
        }
    }
    /* this Function to deal with the Multi create select components that I used as an example with the filed Genry just to show it to you because I think it is a nicer UI for multi select options to create the ability */
    onCreateOption = (inputValue) => {
        const Genre = [...this.state.Genre]
        Genre.push(inputValue)
        const selectedValues = [...this.state.selectedValues]
        const newSelect = {
            __isNew__: true,
            label: inputValue,
            value: inputValue
        }
        selectedValues.push(newSelect)
        this.setState({Genre, selectedValues})
    }
    /*Handeling adding multable Ratings options */
    handelClickRatings = e => {
        let currentRatings = [...this.state.Ratings]
        let newRatings = {
            "Source": this.state.Source,
            "Value": this.state.Value
        }
        currentRatings.push(newRatings)
        this.setState({Ratings: currentRatings, Source: "", Value: ""})
    }

    render() {
        return (
            <div className="App">
                <h1>Nowtilus Assement</h1>
                <h4>Entering Movies Form</h4>
                <p>Using this Form you can fill the required fields and automatically the rest of the fields will be filled from http://www.omdbapi.com API, You can't change the data after it is fetched from the Api so there will don't be conflict. But we could implement he possibility to change the data after the fetch</p>
                <form >
                <fieldset>
                <legend>Enter New Movie:</legend>
                    <TextField
                        variant="outlined"
                        onChange={this.handelChange}
                        disabled
                        name="NowtilusUUID"
                        required
                        value={this.state.NowtilusUUID}
                        label="NowtilusUUID"
                        margin="normal"
                        style={{margin:"5px"}}></TextField>

                    <TextField
                        variant="outlined"
                        value={this.state.imdbID}
                        onChange={this.handelChange}
                        name="imdbID"
                        label="IMDBID"
                        margin="normal"
                        style={{margin:"5px"}}></TextField>

                    <TextField
                        variant="outlined"
                        value={this.state.Title}
                        onChange={this.handelChange}
                        name="Title"
                        required
                        label="Title"
                        margin="normal"
                        style={{margin:"5px"}}></TextField>

                    <TextField
                        variant="outlined"
                        value={this.state.Plot}
                        onChange={this.handelChange}
                        name="Plot"
                        label="Short synopsis "
                        multiline
                        margin="normal"
                        style={{margin:"5px"}}></TextField>

                    <TextField
                        variant="outlined"
                        value={this.state.Released}
                        onChange={this.handelChange}
                        name="Released"
                        required
                        label="Release Date"
                        margin="normal"
                        style={{margin:"5px"}}
                        type="date"
                        InputLabelProps={{
                        shrink: true
                    }}></TextField>

                    <TextField
                        variant="outlined"
                        value={this.state.Production}
                        onChange={this.handelChange}
                        name="Production"
                        label="Studio"
                        margin="normal"
                        style={{margin:"5px"}}></TextField>
                    <FormGroup row>
                        <TextField
                            variant="outlined"
                            value={this.state.Source}
                            onChange={this.handelChange}
                            name="Source"
                            label="Ratings source"
                            margin="normal"
                            style={{margin:"5px"}}></TextField>
                        <TextField
                            variant="outlined"
                            value={this.state.Value}
                            onChange={this.handelChange}
                            name="Value"
                            label="Ratings Value"
                            margin="normal"
                            style={{margin:"5px"}}></TextField>
                        <Button
                            variant="contained"
                            onClick={this.handelClickRatings}
                            color="primary"
                            style={{width: "auto", height: "15px"}}>
                            Add New Rating
                        </Button>
                        <Paper style={{margin: "10px",padding:"5px"}}>
                        {this
                            .state
                            .Ratings
                            .map((item, index) => {
                                return (
                                    <p key={index}>
                                        {item.Source}
                                        <small
                                            style={{
                                            color: "red"
                                        }}>{item.Value}</small>|</p>
                                )
                            })}
                        </Paper>
                    </FormGroup>

                    <TextField
                        value={this.state.Actors.toString()}
                        variant="outlined"
                        onChange={this.handelChange}
                        name="Actors"
                        multiline
                        label="Actors"
                        margin="normal"
                        style={{margin:"5px"}}></TextField>
                    <TextField
                        variant="outlined"
                        value={this.state.Director.toString()}
                        onChange={this.handelChange}
                        name="Director"
                        multiline
                        label="Director"
                        margin="normal"
                        style={{margin:"5px"}}></TextField>
                    <TextField
                        variant="outlined"
                        value={this.state.Writer.toString()}
                        onChange={this.handelChange}
                        name="Writer"
                        multiline
                        label="Writer"
                        margin="normal"
                        style={{margin:"5px"}}></TextField>

                    <CreatableSelect
                        isMulti
                        placeholder="Genre"
                        value={this.state.selectedValues}
                        onCreateOption={this.onCreateOption}
                        name="Genre"
                        ></CreatableSelect>

                    <Button variant="contained" color="primary" type="submit" style={{margin:"10px"}}>
                        Submit
                    </Button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default App;
