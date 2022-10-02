import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const maxPrice = action.payload.reduce(
      (max, cur) => (cur.price > max ? cur.price : max),
      0
    );

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.filters.max_price,
        min_price: 0,
        max_price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const {
      all_products,
      filters: {
        text,
        category,
        company,
        color,
        price,
        min_price,
        max_price,
        shipping,
      },
    } = state;

    let temp_products = [...all_products];

    if (text.trim()) {
      temp_products = temp_products.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    if (category !== 'all') {
      temp_products = temp_products.filter((product) => {
        return product.category === category;
      });
    }

    if (company !== 'all') {
      temp_products = temp_products.filter((product) => {
        return product.company === company;
      });
    }

    if (color !== 'all') {
      temp_products = temp_products.filter((product) => {
        return product.colors.some((clr) => clr === color);
      });
    }

    if (price < max_price) {
      temp_products = temp_products.filter((product) => {
        return product.price <= price;
      });
    }

    if (shipping) {
      temp_products = temp_products.filter((product) => {
        return product.shipping;
      });
    }

    return { ...state, filtered_products: temp_products };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }

    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filtered_products: tempProducts };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
