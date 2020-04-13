import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
}

  render() {
    return (
      <div className="App">
        <Header />
        <Menu dishes={this.state.dishes}
            onClick={(dishId) => this.onDishSelect(dishId)} />
        <div className="row">
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
