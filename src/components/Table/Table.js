import React from 'react';
import './table.css';

const Table = ({ list, messages, configs }) => {
  return (
    <div className='table-container'>
      {list?.length ? (
        <>
          <h3 style={{ color: '#1a5c74' }}>{messages.heading}</h3>
          <table id='list'>
            <tr>
              {configs?.map(({ header }) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
            {list.map((item) => (
              <tr key={item.id}>
                {configs?.map(({ attribute, element }) => (
                  <td key={attribute}>
                    {element
                      ? React.createElement(attribute, {
                          item,
                          ...element.props,
                        })
                      : item?.[attribute]}
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </>
      ) : (
        <h3 style={{ color: '#1a5c74' }}>{messages.noRecords}</h3>
      )}
    </div>
  );
};

export default Table;
