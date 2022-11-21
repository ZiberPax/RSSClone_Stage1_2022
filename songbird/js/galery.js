import { birdsData } from "./birds.js";
import {playpause} from "./player.js";
import {timeUpdate} from "./player.js";


// console.log(blocksOne.lastElementChild);

// fillBird(blocksOne.className, blocksOne.firstElementChild.className, 0, 0);
// fillBird(blocksOne.className, blocksOne.lastElementChild.className, 0, 1);

// fillBird(blocks[1].firstElementChild.className, 0, 2);
// fillBird(blocks[1].className, blocks[1].lastElementChild.className, 0, 3);





function fillSection (groupClass, indexArrBird) {
  
  const blocksOne = document.querySelector(`.${groupClass} .bird_block_one`);
  const blocksTwo = document.querySelector(`.${groupClass} .bird_block_two`);
  const blocksThree = document.querySelector(`.${groupClass} .bird_block_three`);

  function fillBird (groupIndex, dataName, section, index) {
    const birdsName = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .bird-details_ul__item_h4`);
    const speciesBird = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .bird-details_ul__item span`);
    const birdDescription = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .bird-details_description`);
    const birdImage = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .bird-details_image`);
  
    const audioSourceDescription = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .bird-details_ul__item__audio-player source`);
    const audioPlayer = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .bird-details_ul__item__audio-player`);
    const current_desc  = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .custom-player_controls_timebar_time_desc`);
    const progressBar_desc = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .custom-player_controls_timebar_bar_desc`);
    const progressBarActive_desc = document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .custom-player_controls_timebar_bar_active_desc`);
    
    birdsName.textContent = birdsData[section][index].name;
    speciesBird.textContent =
      birdsData[section][index].species;
    birdDescription.textContent =
      birdsData[section][index].description;
    birdImage.src = birdsData[section][index].image;
    audioSourceDescription.src =
      birdsData[section][index].audio;
    audioPlayer.load();
  
    playpause(audioPlayer, document.querySelector(`.${groupClass} .${groupIndex} .${dataName} .custom-player_controls__playback_desc`));
    timeUpdate(audioPlayer, current_desc, progressBarActive_desc,progressBar_desc);
  }

  fillBird(blocksOne.className, blocksOne.firstElementChild.className, indexArrBird, 0);
  fillBird(blocksOne.className, blocksOne.lastElementChild.className, indexArrBird, 1);

  fillBird(blocksTwo.className, blocksTwo.firstElementChild.className, indexArrBird, 2);
  fillBird(blocksTwo.className, blocksTwo.lastElementChild.className, indexArrBird, 3);

  fillBird(blocksThree.className, blocksOne.firstElementChild.className, indexArrBird, 4);
  fillBird(blocksThree.className, blocksOne.lastElementChild.className, indexArrBird, 5);
  
}



fillSection (`bird_group_one`,0)
fillSection (`bird_group_two`,1)
fillSection (`bird_group_three`,2)
fillSection (`bird_group_four`,3)
fillSection (`bird_group_five`,4)
fillSection (`bird_group_six`,5)