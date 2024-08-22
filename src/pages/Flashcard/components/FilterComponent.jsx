import React, { useState } from 'react';
import FilteringDropdown from './FilteringDropdown';
import StatusFilteringDropdown from './StatusFilteringDropdown';

const FilterComponent = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const colors = ['#ff0000', '#00ff00', '#0000ff']; // Example colors
  const statuses = ['완료', '진행중', '대기중'];

  return (
    <div>
      <h3>색상 선택</h3>
      <FilteringDropdown 
        colors={colors} 
        selectedColor={selectedColor} 
        onColorSelect={setSelectedColor} 
      />
      
      <h3>학습 상태 선택</h3>
      <StatusFilteringDropdown 
        statuses={statuses} 
        selectedStatus={selectedStatus} 
        onStatusSelect={setSelectedStatus} 
      />
    </div>
  );
};

export default FilterComponent;
