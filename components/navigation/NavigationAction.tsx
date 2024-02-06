'use client';

import { Plus } from 'lucide-react';
import { ActionTooltip } from '@/components/action-tooltip';
import { useModal } from '@/hooks/useModalStore';

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip label='Add Server' side='right' align='center'>
        <button
          className='group flex items-center'
          onClick={() => onOpen('createServer')}>
          <div className='navigation-action_add-btn'>
            <Plus
              className='group-hover:text-white transition text-green-500'
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
