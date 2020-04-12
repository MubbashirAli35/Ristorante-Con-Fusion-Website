import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDishDetail(dish) {
        if(dish != null) {
            return(
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle><h4>{dish.name}</h4></CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                    </Card>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        } 
    }

    renderComments(comments) {
        const comment = comments.map(comment => {
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', 
                    day: '2-digit'}).format(new Date(comment.date))}</p>
                </li>
            );
        });
        
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comment}
                </ul>
            </div>
        );
    
    }

    render() {
        if(this.props.dish != null) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDishDetail(this.props.dish)}
                        </div>
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }
}

export default DishDetail;