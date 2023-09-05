import { Col, Drawer, Row } from "antd";
import React, { FC, Fragment, memo, useMemo } from "react";
import { OrderDetailsProps } from ".";
import Span from "./Span";
import convertPrice from "~/utils/convert-price";
import { ProductsLabel, ProductsTable, TBody, THead } from "./styled";
import convertTimestamp from "~/utils/convert-timestamp";

const ViewOrder: FC<{
  order: OrderDetailsProps;
  viewOrder: boolean;
  handleViewOrder: (status: boolean) => void;
}> = ({ order, viewOrder, handleViewOrder }) => {
  const total = useMemo(() => {
    return order.order_details?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [order.order_details]);

  return (
    <Drawer
      title="View Order Details"
      placement="right"
      open={viewOrder}
      onClose={() => handleViewOrder(false)}
      width={1400}
    >
      <Row gutter={24}>
        <Col span={4}>
          <Span label="Order Code" value={order.order_code} />
        </Col>
        <Col span={4}>
          <Span label="Branch Name" value={order.branch.name} />
        </Col>
        <Col span={4}>
          <Span label="Created At" value={convertTimestamp(order.created_at)} />
        </Col>
        <Col span={4}>
          <Span label="Status" value={order.status} />
        </Col>
        <Col span={4}>
          <Span label="Total" value={convertPrice(total)} />
        </Col>
        <Col span={4}>
          <Span label="Payment" value={order.payment} />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={4}>
          <Span
            label="Approved Date"
            value={
              order.approved_date
                ? convertTimestamp(order.approved_date)
                : "N/A"
            }
          />
        </Col>
        <Col span={4}>
          <Span
            label="Packaged Date"
            value={
              order.packaged_date
                ? convertTimestamp(order.packaged_date)
                : "N/A"
            }
          />
        </Col>
        <Col span={4}>
          <Span
            label="Started Shipment Date"
            value={
              order.started_date ? convertTimestamp(order.started_date) : "N/A"
            }
          />
        </Col>
        <Col span={4}>
          <Span
            label="Completed Shipment Date"
            value={
              order.completed_date
                ? convertTimestamp(order.completed_date)
                : "N/A"
            }
          />
        </Col>
        <Col span={4}>
          <Span
            label="Cancelled Date"
            value={
              order.cancelled_date
                ? convertTimestamp(order.cancelled_date)
                : "N/A"
            }
          />
        </Col>
        <Col span={4}>
          <Span
            label="Returned Date"
            value={
              order.returned_date
                ? convertTimestamp(order.returned_date)
                : "N/A"
            }
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={4}>
          <Span
            label="Approved By"
            value={order.approved_by ? order.approved_by : "N/A"}
          />
        </Col>
        <Col span={4}>
          <Span
            label="Packaged By"
            value={order.packaged_by ? order.packaged_by : "N/A"}
          />
        </Col>
        <Col span={4}>
          <Span
            label="Started Shipment By"
            value={order.started_by ? order.started_by : "N/A"}
          />
        </Col>
        <Col span={4}>
          <Span
            label="Completed Shipment By"
            value={order.completed_by ? order.completed_by : "N/A"}
          />
        </Col>
        <Col span={4}>
          <Span
            label="Cancelled By"
            value={order.cancelled_by ? order.cancelled_by : "N/A"}
          />
        </Col>
        <Col span={4}>
          <Span
            label="Returned By"
            value={order.returned_by ? order.returned_by : "N/A"}
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

export default memo(ViewOrder);
