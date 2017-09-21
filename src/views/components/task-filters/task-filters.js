import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './task-filters.css';


const TaskFilters = ({filter}) => (
  <ul className="task-filters">
    <li><NavLink isActive={() => !filter} to="/">All</NavLink></li>
    <li><NavLink isActive={() => filter === 'kitchen'} to={{pathname: '/', search: '?filter=kitchen'}}>Kitchen</NavLink></li>
    <li><NavLink isActive={() => filter === 'garage'} to={{pathname: '/', search: '?filter=garage'}}>Garage</NavLink></li>
    <li><NavLink isActive={() => filter === 'empty'} to={{pathname: '/', search: '?filter=empty'}}>Out of Stock</NavLink></li>
    <li><NavLink isActive={() => filter === 'basket'} to={{pathname: '/', search: '?filter=basket'}}>Shopping List</NavLink></li>
  </ul>
);

TaskFilters.propTypes = {
  filter: PropTypes.string
};


export default TaskFilters;
