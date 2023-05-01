import styled from 'styled-components';

const FeedbackWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FeedbackTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FeedbackOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FeedbackOptionLabel = styled.label`
  font-size: 18px;
  margin-left: 10px;
`;

const FeedbackInput = styled.input`
  margin-right: 10px;
`;

const FeedbackTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  font-size: 18px;
  resize: none;
`;

const FeedbackSubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Feedback = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted!');
        onClose();
    };

    return (
        <FeedbackWrapper>
            <FeedbackTitle>Feedback</FeedbackTitle>
            <form onSubmit={handleSubmit}>
                <FeedbackOptionWrapper>
                    <FeedbackInput type="radio" id="correct" name="feedback" value="correct" />
                    <FeedbackOptionLabel htmlFor="correct">The outcome was correct.</FeedbackOptionLabel>
                </FeedbackOptionWrapper>
                <FeedbackOptionWrapper>
                    <FeedbackInput type="radio" id="incorrect" name="feedback" value="incorrect" />
                    <FeedbackOptionLabel htmlFor="incorrect">The outcome was incorrect.</FeedbackOptionLabel>
                </FeedbackOptionWrapper>
                <FeedbackTextarea placeholder="Please provide additional feedback..." />
                <FeedbackSubmitButton>Submit Feedback</FeedbackSubmitButton>
            </form>
        </FeedbackWrapper>
    );
};

export default Feedback;
