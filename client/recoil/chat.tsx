import { atom } from 'recoil';

const activeChatAtoms = atom({
  key: 'activeChatKey',
  default: {
    partnerName:'Optimus Prime',
  }
});

export default activeChatAtoms