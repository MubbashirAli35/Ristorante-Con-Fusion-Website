import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
         Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length) >= len;
const maxLength = (len) => (val) => !(val) || (val.length) <= len;

class ComponentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.comment);
    }

    render() {
        return(
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => {this.handleSubmit(values)}}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating">
                                        Rating
                                    </Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="author">
                                        Your Name
                                    </Label>
                                    <Control.text model=".author" name="author" className="form-control"
                                     placeholder="Your Name" 
                                     validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                     }} />
                                    <Errors className="text-danger" 
                                     model=".author"
                                     show="touched"
                                     messages={{
                                         required: 'Required! ',
                                         minLength: 'Must be greater than 2 characters',
                                         maxLength: 'Must be less than 15 characters'
                                     }} >
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">
                                        Comment
                                    </Label>
                                    <Control.textarea model=".comment" name="comment" 
                                        className="form-control" rows="6" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row> 
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderDishDetail({dish}) {
    if(dish != null) {
        return(
            <div>
                <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle><h4>{dish.name}</h4></CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    } 
}

function RenderComments({comments, postComment, dishId}) {
    const comment = comments.map(comment => {
        return(
            <Fade in>
                <li key={comment._id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author.firstName} {comment.author.lastName}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', 
                    day: '2-digit'}).format(new Date(comment.createdAt))}</p>
                </li>
            </Fade>
        );
    });
    
    return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                    {comment}
                </Stagger>
            </ul>
            <ComponentForm dishId={dishId} postComment={postComment} />
        </div>
    );

}

const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if(props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if(props.dish != null) {

        console.log('Hello World!');
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
                    <RenderComments comments={props.comments} 
                     postComment={props.postComment}
                     dishId={props.dish._id} />
                </div>
            </div>
        );
    } else {
        console.log('Hello World!');
        return(
            <div>

            </div>
        );
    }
}

export default DishDetail;