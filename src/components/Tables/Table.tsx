import { ISale } from "../../models/ISale";

import "./Table.scss";
import React from "react";

interface ISortConfigKey {
  key: string;
  direction?: string;
}

const useSortableData = (items: ISale[], config = null) => {
  const [sortConfig, setSortConfig] = React.useState<ISortConfigKey | null>(
    config
  );

  // Do not need to change every time. Memoize this
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a: ISale, b: ISale) => {
        let key_a = sortConfig.key as keyof typeof a;
        let key_b = sortConfig.key as keyof typeof b;
        if (a[key_a] < b[key_b]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key_a] > b[key_b]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const Table = (props: { data: ISale[] }): JSX.Element => {
  // Can be moved to enums

  const { items, requestSort, sortConfig } = useSortableData(props.data);
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const columns: readonly string[] = [
    "weekEnding",
    "retailSales",
    "wholesaleSales",
    "unitsSold",
    "retailerMargin",
  ];

  return (
    <>
      <div className="product-sales-table card">
        <table>
          <thead>
            <tr>
              {columns.map((column: string, index: number) => {
                return (
                  <th key={index} className="table-header">
                    <button
                      type="button"
                      onClick={() => requestSort(column)}
                      className={getClassNamesFor(column)}
                    >
                      {" "}
                      {column.toUpperCase()}{" "}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((sale: any, index: number) => {
                return (
                  <tr key={sale.id}>
                    <td>{sale.weekEnding}</td>
                    <td>{`$${sale.retailSales.toLocaleString()}`}</td>
                    <td>{`$${sale.wholesaleSales.toLocaleString()}`}</td>
                    <td>{sale.unitsSold}</td>
                    <td>{`$${sale.retailerMargin.toLocaleString()}`}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
