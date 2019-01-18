import React,{Component} from 'react';

class MiscellanousCard extends Component{

    componentDidMount(){
    }

    render(){
        return(
                        <div class="row " >
                            <div class="col">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">Want more of Regression 360?</h5>
                                        <div class="row" >
                                            <div class="col">
                                                <div class="card mb-3">
                                                    <div class="card-body">
                                                        <a href="#" class="btn btn-warning">More Insights?</a>
                                                        <p class="card-text">Commits per day? Jenkins builds per day? Which user flow u effected?</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="card mb-3">
                                                    <div class="card-body">
                                                        <a href="#" class="btn btn-danger">Game mode</a>
                                                        <p class="card-text">Leadership boards? Regression 360 rankings? Your commit quality?</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        );
    }
}


export default MiscellanousCard;