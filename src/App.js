import React, {Component} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import CreatableSelect from 'react-select/lib/Creatable';
import Button from '@material-ui/core/Button';
import uuidv1 from 'uuid/v1';

class App extends Component {

    state = {
        NowtilusUUID: uuidv1(),
        imdbID: "",
        Title: "",
        ShortSynopsis: "",
        Released: "",
        Studio: "",
        Ratings: [],
        Actors: [],
        Director: [],
        Writer: [],
        Genre: [],
        selectedValues: [],
        loadedData: {}
    }

    loadingData = () => {
        if (this.state.Title.length > 0 && this.state.NowtilusUUID.length > 0 && this.state.Released.length > 0) {
            fetch(`http://www.omdbapi.com/?t=${this.state.Title}&apikey=32671f58`).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            }).then(data => {
                
            });

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.Title !== prevState.Title || this.state.Released !== prevState.Released) {
            this.loadingData()
        }

    }

    handelChange = e => {
        this.loadingData()
        if (e.target) {
            if (Array.isArray(this.state[e.target.name])) {
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

    onCreateOption = (inputValue) => {
        console.log(inputValue)
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
                <form >
                    <TextField
                        onChange={this.handelChange}
                        disabled
                        name="NowtilusUUID"
                        required
                        value={this.state.NowtilusUUID}
                        label="NowtilusUUID"
                        margin="normal"
                        className="inputfield"></TextField>

                    <TextField
                        value={this.state.imdbID}
                        onChange={this.handelChange}
                        name="imdbID"
                        label="IMDBID"
                        margin="normal"
                        className="inputfield"></TextField>

                    <TextField
                        value={this.state.Title}
                        onChange={this.handelChange}
                        name="Title"
                        required
                        label="Title"
                        margin="normal"
                        className="inputfield"></TextField>

                    <TextField
                        value={this.state.ShortSynopsis}
                        onChange={this.handelChange}
                        name="ShortSynopsis"
                        required
                        label="Short synopsis "
                        margin="normal"
                        className="inputfield"></TextField>

                    <TextField
                        value={this.state.Released}
                        onChange={this.handelChange}
                        name="Released"
                        required
                        label="Release Date"
                        margin="normal"
                        className="inputfield"
                        type="date"></TextField>

                    <TextField
                        value={this.state.Studio}
                        onChange={this.handelChange}
                        name="Studio"
                        required
                        label="Studio"
                        margin="normal"
                        className="inputfield"></TextField>
                    <FormGroup row>
                        <TextField
                            value={this.state.Source}
                            onChange={this.handelChange}
                            name="Source"
                            required
                            label="Ratings source"
                            margin="normal"
                            className="inputfield"></TextField>
                        <TextField
                            value={this.state.Value}
                            controlled
                            onChange={this.handelChange}
                            name="Value"
                            required
                            label="Ratings Value"
                            margin="normal"
                            className="inputfield"></TextField>
                        <Button
                            variant="contained"
                            onClick={this.handelClickRatings}
                            color="primary"
                            size="small">
                            Add New Rating
                        </Button>
                        {this
                            .state
                            .Ratings
                            .map(item => {
                                return (
                                    <p>
                                        {item.Source}
                                        <small
                                            style={{
                                            color: "red"
                                        }}>{item.Value}</small>|</p>
                                )
                            })}
                    </FormGroup>

                    <TextField
                        value={this.state.Actors}
                        onChange={this.handelChange}
                        name="Actors"
                        required
                        label="Actors"
                        margin="normal"
                        className="inputfield"></TextField>

                    <TextField
                        value={this.state.Director}
                        onChange={this.handelChange}
                        name="Director"
                        required
                        label="Director"
                        margin="normal"
                        className="inputfield"></TextField>
                    <TextField
                        value={this.state.Writer}
                        onChange={this.handelChange}
                        name="Writer"
                        required
                        label="Writer"
                        margin="normal"
                        className="inputfield"></TextField>

                    <CreatableSelect
                        isMulti
                        placeholder="Gerne"
                        value={this.state.selectedValues}
                        onCreateOption={this.onCreateOption}
                        name="Gerne"></CreatableSelect>

                    <Button variant="contained" color="primary" type="submite">
                        Send

                    </Button>

                </form>
            </div>
        );
    }
}

export default App;
