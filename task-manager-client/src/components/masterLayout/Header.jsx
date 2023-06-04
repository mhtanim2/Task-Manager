import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineCheckCircle, AiOutlineEdit } from 'react-icons/ai';
import { MdFullscreen, RiDashboardLine } from "react-icons/all";
import { BiMenuAltLeft } from 'react-icons/bi';
import { BsHouseDoorFill, BsListNested } from "react-icons/bs";
import { Link } from 'react-router-dom';
  
  const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Button
          zIndex={'overlay'}
          pos={'fixed'}
          top={'4'}
          left={'4'}
          colorScheme="purple"
          p={'0'}
          w={'10'}
          h={'10'}
          borderRadius={'full'}
          onClick={onOpen}
        >
          <BiMenuAltLeft size={'20'} />
        </Button>
  
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
  
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader><span>Task Manager</span> </DrawerHeader>
            <DrawerBody>
              <VStack alignItems={'flex-start'}>
                <Button
                  onClick={onClose}
                  variant={'ghost'}
                  colorScheme={'purple'}
                >
                  <Link to={'/'}><RiDashboardLine className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span> </Link>
                </Button>
  
                <Button
                  onClick={onClose}
                  variant={'ghost'}
                  colorScheme={'purple'}
                >
                  <Link to={'/Create'}><AiOutlineEdit className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Create New</span>
</Link>
                </Button>
  
                <Button
                  onClick={onClose}
                  variant={'ghost'}
                  colorScheme={'purple'}
                >
                  <Link to={'/All'}><BsListNested className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">New Task</span></Link>
                </Button>
  
                <Button
                  onClick={onClose}
                  variant={'ghost'}
                  colorScheme={'purple'}
                >
                  <Link to={'/Progress'}> <BsHouseDoorFill className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">In Progress</span></Link>
                </Button>

                <Button
                  onClick={onClose}
                  variant={'ghost'}
                  colorScheme={'purple'}
                >
                  <Link to={'/Completed'}><AiOutlineCheckCircle className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Completed</span></Link>
                </Button>

                <Button
                  onClick={onClose}
                  variant={'ghost'}
                  colorScheme={'purple'}
                >
                  <Link to={'/Canceled'}><MdFullscreen className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Canceled</span></Link>
                </Button>
              </VStack>
  
              <HStack
                pos={'absolute'}
                bottom={'10'}
                left={'0'}
                w={'full'}
                justifyContent={'space-evenly'}
              >
                <Button onClick={onClose} colorScheme={'purple'}>
                  <Link to={'/Login'}>Log In</Link>
                </Button>
                <Button
                  onClick={onClose}
                  colorScheme={'purple'}
                  variant={'outline'}
                >
                  <Link to={'/Registration'}>Sign Up</Link>
                </Button>
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  
  export default Header;
  