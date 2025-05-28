import { Col, Row } from "react-bootstrap";

const MessageTitleComponent = ({ otherUser }) => {
  return (
    <>
      <Row
        className="bg-primary text-white p-3"
        style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      >
        <Col>
          <h5>
            <span className="fw-bold">{otherUser}</span>
          </h5>
        </Col>
      </Row>
    </>
  );
};

export default MessageTitleComponent;
