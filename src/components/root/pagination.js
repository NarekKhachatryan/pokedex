// Modules
import React, { Component } from 'react';

// Component
export default class Pagination extends Component {
  // Pagination constructor.
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pagination: []
    };
  }

  // Props active page.
  componentWillMount() {
    const { page, count } = this.props;
    this.pagination(page, count);
  }

  // nextProps active page.
  componentWillReceiveProps(nextProps) {
    const { page, count } = nextProps;
    this.pagination(page, count);
  }

  // Pagination numbers array.
  pagination(page, count) {
    const { show, buttons } = this.props;
    const pagination = [];
    const part = Math.ceil(count / buttons);

    if (show > part) {
      for (let x = 0; x < part; x++) {
        pagination.push(x);
      }
    } else if (page > (part - Math.ceil(show / 2))) {
      for (let x = part - show; x < part; x++) {
        pagination.push(x);
      }
    } else if (page < Math.ceil(show / 2)) {
      if (show > part) {
        for (let x = 0; x < part; x++) {
          pagination.push(x);
        }
      } else {
        for (let x = 0; x < show; x++) {
          pagination.push(x);
        }
      }
    } else {
      for (let x = page - Math.floor(show / 2); x < page + Math.ceil(show / 2); x++) {
        pagination.push(x);
      }
    }
    this.setState({ pagination, show, page });
  }

  // Prev offset.
  prev() {
    let { page } = this.state;
    const { count } = this.props;
    page--;
    this.pagination(page, count);
    this.props.yourFunction(page);
  }

  // Edit offset.
  edit(page) {
    const { count } = this.props;
    this.pagination(page, count);
    this.props.yourFunction(page);
  }

  // Next arrow.
  next() {
    let { page } = this.state;
    const { count } = this.props;
    page++;
    this.pagination(page, count);
    this.props.yourFunction(page);
  }

  // Pagination render.
  render() {
    const { pagination, page } = this.state;
    const { count, buttons } = this.props;

    return (
      <div className="pagination">
        <ul>
          {page > 0 && <li onClick={() => this.prev()}>
            <em
              className="fa fa-angle-left"
              aria-hidden="true"
            />
          </li>}
          {pagination && pagination.length > 0 && pagination.map((item, index) => {
            return (
              <li
                key={index}
                className={item === page ? 'active' : ''}
                onClick={() => this.edit(item)}
              >
                {item + 1}
              </li>
            );
          })}
          {page < (Math.ceil(count / buttons) - 1) && <li onClick={() => this.next()}>
            <em
              className="fa fa-angle-right"
              aria-hidden="true"
            />
          </li>}
        </ul>
      </div>
    );
  }
}



// Default values
Pagination.defaultProps = {
  page: 0,     // Active page number,
  buttons: 10, // counts buttons,
  show: 10     // the number of visible numbers.
};
