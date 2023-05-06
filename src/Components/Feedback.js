import styled from 'styled-components';

const FeedbackWrapper = styled.div`
  margin: 0 25%;
  align-self: center;
  border-radius: 5%;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
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
  width: 98%;
  border-radius: 10px;
  padding: 2%;
  height: 100px;
  margin-top: 20px;
  font-size: 18px;
  resize: none;
`;

const FeedbackSubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  align-self: center;
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 14px;
  cursor: pointer;
`;

const Feedback = ({onClose}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <FeedbackWrapper>
            <FeedbackTitle>Feedback</FeedbackTitle>
            <form onSubmit={handleSubmit}>
                <FeedbackOptionWrapper>
                    <FeedbackInput type="radio" id="correct" name="feedback" value="correct" />
                    <FeedbackOptionLabel htmlFor="correct">Postavljena diagnoza je bila pravilna.</FeedbackOptionLabel>
                </FeedbackOptionWrapper>
                <FeedbackOptionWrapper>
                    <FeedbackInput type="radio" id="incorrect" name="feedback" value="incorrect" />
                    <FeedbackOptionLabel htmlFor="incorrect">Postavljena diagnoza ni bila pravilna.</FeedbackOptionLabel>
                </FeedbackOptionWrapper>
                <FeedbackTextarea placeholder="Če diagnoza ni bila pravilna, prosim napišite pravilno diagnozo." />
                <FeedbackSubmitButton>Submit Feedback</FeedbackSubmitButton>
            </form>
        </FeedbackWrapper>
    );
};

export default Feedback;
