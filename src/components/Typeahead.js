import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Suggestion from './Suggestion';

const Typeahead = ({ suggestions, handleSelect }) => {
    const [value, setValue] = React.useState('');

    const matchedSuggestions = suggestions.filter((suggestion) =>
    suggestion.title.toLowerCase().includes(value.toLowerCase())
);
  
    return (
      <Wrapper>
          <Row>
           <Input
// Takes the value entered in the field
          type='text'
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              handleSelect(ev.target.value);
            }
          }}
        />
  <ClearButton
  // Reset button uses setValue to make the value empty.
          onClick={() => {
            setValue('');
          }}
        >
          Clear
        </ClearButton>
     </Row>
     <Suggestions>
        {value.length >= 2 &&
        matchedSuggestions.map((suggestion) => {
        const matchIndex = suggestion.title
            .toLowerCase()
            .indexOf(value.toLowerCase());
        const matchEnd = matchIndex + value.length;
        const firstHalf = suggestion.title.slice(0,matchEnd);
        const secondHalf = suggestion.title.slice(matchEnd);
// 
        return (
                <Suggestion
                    key={suggestion.id}
                    onClick={() =>
                    handleSelect(suggestion.title)
                            }
                            >
                        <span>
                            {firstHalf}
                                <Prediction>{secondHalf}
                                </Prediction>
                                    <em> in </em>
                                    <CategoryId>
                                            {suggestion.categoryId}
                                        </CategoryId>
                                    </span>
                        </Suggestion>
                           );
                })}
            </Suggestions>
     </Wrapper>
     )
};

  // Designs for components
  const Wrapper = styled.div`
  position: relative;
`;

const Row = styled.div`
  display: flex;
`;

  const ClearButton = styled(Button)`
  margin-left: 10px;
`;

const Input = styled.input`
  width: 350px;
  height: 40px;
  padding: 0 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
`;

const Suggestions = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: -10px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(100%);
  &:empty {
        display: none;
    }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const CategoryId = styled.em`
    color: purple;
    font-size: 14px;
`;

export default Typeahead;
