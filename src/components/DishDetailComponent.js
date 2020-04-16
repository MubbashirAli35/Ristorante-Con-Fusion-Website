import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';


function RenderDishDetail({dish}) {
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

function RenderComments({comments}) {
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

const DishDetail = (props) => {
    if(props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={'/menu'}>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDishDetail dish={props.dish} />
                    </div>
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}

export default DishDetail;