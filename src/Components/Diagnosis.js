import styled from 'styled-components';

const DiagnosisHeader = styled.div`
  display: flex;
  padding: 2% 0%;
  justify-content: center;
  width: 100%;
`;

const DiagnosisText = styled.text`
  font-size: 30px;
  color: white;
`;

const Diagnosis = ({value}) => {
    return (
        <DiagnosisHeader>
            <DiagnosisText>
                {value}
            </DiagnosisText>
        </DiagnosisHeader>
    );
};

export default Diagnosis;
