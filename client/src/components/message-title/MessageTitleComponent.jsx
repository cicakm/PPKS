import { Col, Row, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

const MessageTitleComponent = ({ otherUser, onBack }) => {
  return (
    <>
      <Row
        className="bg-primary text-white p-3"
        style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      >
        <Col className="d-flex align-items-center">
            <ArrowLeft as={Button} variant="light" className="me-3" onClick={onBack} size={20} />
          <h5>
            <span className="fw-bold">{otherUser}</span>
          </h5>
        </Col>
      </Row>
    </>
  );
};

export default MessageTitleComponent;
