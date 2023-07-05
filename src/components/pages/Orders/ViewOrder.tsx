import { Col, Drawer, Row } from "antd";
import React, { FC, Fragment } from "react";
import { OrderDetailsProps } from ".";
import Span from "./Span";
import convertPrice from "~/utils/convert-price";
import { ProductsLabel, ProductsTable, TBody, THead } from "./styled";

const ViewOrder: FC<{
  order: OrderDetailsProps;
  viewOrder: boolean;
  handleViewOrder: (status: boolean) => void;
}> = ({ order, viewOrder, handleViewOrder }) => {
  return (
    <Drawer
      title="View Order Details"
      placement="right"
      open={viewOrder}
      onClose={() => handleViewOrder(false)}
      width={1200}
    >
      <Row gutter={24}>
        <Col span={5}>
          <Span label="Order ID" value={order.id} />
        </Col>

        <Col span={5}>
          <Span
            label="Estimated Shipped Date"
            value={order.estimated_shipped_date.toString()}
          />
        </Col>

        <Col span={5}>
          <Span label="Total" value={convertPrice(order.total)} />
        </Col>
        <Col span={5}>
          <Span label="Status" value={order.status} />
        </Col>
        <Col span={4}>
          <Span label="Payment" value={order.payment} />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={5}>
          <Span label="Create At" value={order.created_at.toString()} />
        </Col>
        <Col span={5}>
          <Span
            label="Approved Date"
            value={order.approved_date ? order.approved_date.toString() : "N/A"}
          />
        </Col>
        <Col span={5}>
          <Span
            label="Shipped Date"
            value={order.shipped_date ? order.shipped_date.toString() : "N/A"}
          />
        </Col>
        <Col span={5}>
          <Span
            label="Canceled Date"
            value={order.canceled_date ? order.canceled_date.toString() : "N/A"}
          />
        </Col>
        <Col span={4}>
          <Span
            label="Return Date"
            value={order.return_date ? order.return_date.toString() : "N/A"}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Span label="Receiver Name" value={order.address.name} />
        </Col>
        <Col span={6}>
          <Span label="Receiver Phone" value={order.address.phone} />
        </Col>
        <Col span={12}>
          <Span
            label="Delivery address"
            value={`${order.address.street}, ${order.address.ward}, ${order.address.city}, ${order.address.district}`}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <ProductsLabel>Product List</ProductsLabel>
          <ProductsTable>
            <THead>
              <tr>
                <th>No.</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </THead>
            <TBody>
              {order.order_details.map((orderDetail, index) => (
                <Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{orderDetail.product.name}</td>
                    <td>{convertPrice(orderDetail.product.price)}</td>
                    <td>{orderDetail.quantity}</td>
                  </tr>
                </Fragment>
              ))}
            </TBody>
          </ProductsTable>
        </Col>
      </Row>
    </Drawer>
  );
};

export default ViewOrder;
