import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  isEditing: boolean;
  value: string;
  onSave: (value: string) => void;
  className?: string;
  // FIX: Replace `keyof JSX.IntrinsicElements` with `React.ElementType` to fix "Cannot find namespace 'JSX'" error.
  tag?: React.ElementType;
  isTextarea?: boolean;
  placeholder?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  isEditing,
  value,
  onSave,
  className,
  tag = 'div',
  isTextarea = false,
  placeholder,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSave = () => {
    setIsFocused(false);
    if (currentValue !== value) {
      onSave(currentValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTextarea) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setCurrentValue(value);
      setIsFocused(false);
    }
  };

  const handleClick = () => {
    if (isEditing) {
      setIsFocused(true);
    }
  };
  
  useEffect(() => {
    if (isFocused && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
    }
  }, [isFocused]);

  const commonProps = {
    className: `${className} ${isEditing ? 'outline-dashed outline-2 outline-offset-2 outline-primary rounded-sm cursor-pointer hover:bg-primary/10 transition-colors' : ''} ${isFocused ? 'ring-2 ring-primary ring-offset-2' : ''}`,
    onClick: handleClick,
  };
  
  const InputComponent = isTextarea ? 'textarea' : 'input';

  if (isEditing && isFocused) {
    return (
      <InputComponent
        ref={inputRef as any}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} bg-base-100 p-1 -m-1 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary`}
        rows={isTextarea ? 5 : undefined}
        placeholder={placeholder}
      />
    );
  }

  const Tag = tag;
  const hasValue = value && value.trim() !== '';

  return (
    <Tag 
      {...commonProps}
      className={`${commonProps.className || ''} ${!hasValue && placeholder ? 'text-gray-400' : ''}`.trim()}
    >
      {hasValue ? value : (placeholder || '')}
    </Tag>
  );
};

export default EditableText;