import styled from 'styled-components';
import { Box, Text } from '../ui';
import { da } from 'date-fns/locale';
import { min, set } from 'date-fns';
import { on } from 'events';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

export const FormGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Label = styled(Text).attrs({ as: 'label', variant: 'label' })`
  cursor: pointer;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.red[500] : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.red[500] : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme, hasError }) => 
      hasError ? `${theme.colors.red[500]}20` : `${theme.colors.primary[500]}20`};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.red[500] : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.body};
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.red[500] : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme, hasError }) => 
      hasError ? `${theme.colors.red[500]}20` : `${theme.colors.primary[500]}20`};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const Select = styled.select<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.red[500] : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.red[500] : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme, hasError }) => 
      hasError ? `${theme.colors.red[500]}20` : `${theme.colors.primary[500]}20`};
  }
`;

export const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.colors.red[500]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const HelpText = styled(Text)`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
';

const HiddenFileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
';

const FileButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
  font-weight: 500;
  white-space: nowrap;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-1px);
  }
';

const FileInputContainer = styled(Box)<{ hasError?: boolean }>`
  display: flex;
  aling-items: center;
  gap: ${({ theme }) => theme.space[3]};
  border: 2px dashed ${({ theme, hasError }) => 
    hasError ? theme.colors.red[500] : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radii.md};
  blackground-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  min-height: ${({ theme }) => theme.space[10]};

';

export const FileInput = ({ children, onChange, hasError, ...props }) => {
  const fileInputRef = React.useRef(null);
  const [fileName, setFileName] = React.useState('Nenhum arquivo selecionado');
  
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : 'Nenhum arquivo selecionado');
    if (onChange) onChange(event);{
      onChange(event);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <FileInputContainer hasError={hasError}>
      <FileButton type="button" onClick={triggerFileInput}>
        {children || 'Upload arquivo'}
      </FileButton>

        <Text
          fontSize="sm"
          color = "gray.600"
          style={{  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
        >
          {fileName}
        </Text>

        <HiddenFileInput
          {...props}
          ref={fileInputRef}
          onChange={handleFileChange}
          />
    </FileInputContainer>
  );
};


