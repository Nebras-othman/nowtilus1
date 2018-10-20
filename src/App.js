import React, {Component} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import CreatableSelect from 'react-select/lib/Creatable';

class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>Nowtilus Assement</h1>

                <TextField
                    required
                    label="NowtilusUUID"
                    margin="normal"
                    className="inputfield"
                    value="312"
                    defaultValue="HI"></TextField>

                <TextField
                    label="IMDBID"
                    margin="normal"
                    className="inputfield"
                    value="312"
                    defaultValue="HI"></TextField>

                <TextField
                    required
                    label="Title"
                    margin="normal"
                    className="inputfield"
                    value="312"
                    defaultValue="HI"></TextField>

                <TextField
                    required
                    label="Short synopsis "
                    margin="normal"
                    className="inputfield"
                    value="312"
                    defaultValue="HI"></TextField>

                <TextField
                    required
                    label="Release Date"
                    margin="normal"
                    className="inputfield"
                    type="date"></TextField>

                <TextField
                    required
                    label="Studio"
                    margin="normal"
                    className="inputfield"
                    value="312"
                    defaultValue="HI"></TextField>
                <FormGroup row>
                    <TextField
                        required
                        label="Ratings source"
                        margin="normal"
                        className="inputfield"
                        value="312"
                        defaultValue="HI"></TextField>
                    <TextField
                        required
                        label="Ratings Value"
                        margin="normal"
                        className="inputfield"
                        value="312"
                        defaultValue="HI"></TextField>
                </FormGroup>

                <TextField
                    required
                    label="Actors"
                    margin="normal"
                    className="inputfield"
                    value="312"
                    defaultValue="HI"></TextField>

                <TextField
                    required
                    label="Director"
                    margin="normal"
                    className="inputfield"
                    value="312"
                    defaultValue="HI"></TextField>
                <TextField
                    required
                    label="Writer"
                    margin="normal"
                    className="inputfield"
                    value="312"
                    defaultValue="HI"></TextField>

                <CreatableSelect
                 isMulti
                 placeholder="Gerne"></CreatableSelect>

            </div>
        );
    }
}

export default App;
