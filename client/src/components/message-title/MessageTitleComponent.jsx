import { Col, Row, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

const MessageTitleComponent = ({ otherUser, onBack }) => {
  return (
    <>
      <Row
        className="bg-primary text-white px-3 py-2"
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          minHeight: 54,
        }}
      >
        <Col className="d-flex align-items-center">
          <ArrowLeft
            as={Button}
            variant="light"
            className="me-3"
            onClick={onBack}
            size={20}
          />
          <span
            className="fw-bold fs-5 text-truncate"
            style={{ maxWidth: 180 }}
          >
            {otherUser}
          </span>
        </Col>
      </Row>
    </>
  );
};

export default MessageTitleComponent;
