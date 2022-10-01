import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const {
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
    all_products,
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              type='text'
              className='search-input'
              placeholder='search'
              value={text}
              onChange={updateFilters}
              name='text'
            />
          </div>
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((item, i) => (
                <button
                  key={i}
                  className={`${
                    category === item.toLowerCase() ? 'active' : null
                  }`}
                  onClick={updateFilters}
                  name='category'
                  type='button'
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className='form-control'>
            <h5>Company</h5>
            <select
              name='company'
              value={company}
              className='company'
              onChange={updateFilters}
            >
              {companies.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='form-control'>
            <h5>Color</h5>
            <div className='colors'>
              {colors.map((clr, i) => {
                if (clr === 'all') {
                  return (
                    <button
                      onClick={updateFilters}
                      name='color'
                      data-color='all'
                      className={`${
                        clr === color ? 'all-btn active' : 'all-btn'
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    name='color'
                    data-color={clr}
                    onClick={updateFilters}
                    className={`${
                      clr === color ? 'color-btn active' : 'color-btn'
                    }`}
                    style={{
                      background: clr,
                    }}
                  >
                    {clr === color ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='form-control'>
            <h5>Price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              min={min_price}
              max={max_price}
              onChange={updateFilters}
              value={price}
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
