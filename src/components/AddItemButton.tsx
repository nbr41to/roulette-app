'use client';

import { setCookie } from '@/lib/cookie';
import { ActionIcon, Button, Input, Modal } from '@mantine/core';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { PiGearSixDuotone, PiTrashDuotone } from 'react-icons/pi';

type Props = {
  items: string[];
};

export const AddItemButton = ({ items }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [stringValue, setStringValue] = useInputState('');

  const handleAddItem = () => {
    setCookie('items', JSON.stringify([...items, stringValue]));
    setStringValue('');
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setCookie('items', JSON.stringify(newItems));
  };

  return (
    <>
      <ActionIcon size="xl" variant="transparent" onClick={open}>
        <PiGearSixDuotone size={32} />
      </ActionIcon>

      <Modal.Root
        opened={opened}
        onClose={close}
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <Modal.Content className="flex flex-col w-full">
          <Modal.Header>
            <h2>Add Item</h2>
            <Modal.CloseButton />
          </Modal.Header>

          <Modal.Body className="flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-x-2">
                <Input
                  className="flex-grow"
                  placeholder="項目"
                  value={stringValue}
                  onChange={setStringValue}
                />
                <Button onClick={handleAddItem}>追加</Button>
              </div>

              <ul className="list-disc px-3 py-4 divide-y">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex justify-between items-center py-3"
                  >
                    ・{item}
                    <ActionIcon
                      color="red"
                      variant="transparent"
                      onClick={() => handleDeleteItem(items.indexOf(item))}
                    >
                      <PiTrashDuotone size={20} />
                    </ActionIcon>
                  </li>
                ))}
              </ul>
            </div>
            <Button onClick={close}>Close</Button>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
