/* All narrative content for The Beacon of Companions. */

const ALLIES = {
  3: {
    id: 'pip',
    name: 'Pip',
    title: 'the Fox Scout',
    icon: '🦊',
    join: 'A quick-eyed fox named Pip trots out of the brush and falls in at your heel. He seems to know every shortcut in the valley.',
    assists: {
      4: 'Pip tests the new planks before anyone else does, trotting across twice to prove they’ll hold.',
      5: 'Pip plants himself in front of the straight dark path and refuses to move until you take the mushroom trail.',
      6: 'Pip squeezes into the gap beneath the boulder to check that the knight is still breathing.',
      7: 'Pip circles the iron wheel three times, then settles by the gatepost to keep watch while everyone pushes.',
      8: 'Pip tunnels under the shared cloaks and curls up against the lantern, warm as a small ember.',
      9: 'Pip keeps pace on the narrow stair, doubling back each time your grip slips.',
      10: 'Pip sits at the railing with his tail wrapped around his paws, waiting for your signal.',
    },
  },
  6: {
    id: 'gorin',
    name: 'Gorin',
    title: 'the Dwarf Blacksmith',
    icon: '🔨',
    join: 'Gorin the blacksmith shoulders his hammer and declares that anything worth building is worth building together. He joins the party.',
    assists: {
      7: 'Gorin runs a thumb over the iron spokes and mutters that whoever built this gate knew their trade.',
      8: 'Gorin wedges a hammer under the lantern to keep it steady, then says nothing about the cold.',
      9: 'Gorin takes the torch’s weight on his own shoulder and tells you to save your strength for the top.',
      10: 'Gorin checks the torch cradle one last time with his hammer, then gives you a single nod.',
    },
  },
  9: {
    id: 'sable',
    name: 'Sable',
    title: 'the Owl Sage',
    icon: '🦉',
    join: 'Sable the great grey owl glides down from the tower shadows and lands beside you. She speaks your name, and offers to lead the way.',
    assists: {
      10: 'Sable perches on the railing beside you, her feathers warm against the cold, waiting to see what you’ll choose.',
    },
  },
};

const ALLY_THRESHOLDS = [3, 6, 9];

const ROUNDS = [
  {
    title: 'The Crossroads',
    image: 'assets/round-01.svg',
    alt: 'A tipped merchant cart on a forked valley road, with travelers offering help and a narrow crag path beyond',
    supported:
      'The valley road splits in two. A merchant’s cart lies tipped in the mud, its wheels spinning, and the driver waves you over with a hopeful grin. The others on the road slow too, ready to lend a hand. The shortcut through the crags would be quicker — but the long way passes the village, and the village could use a wayfinder.',
    strained:
      'The valley road splits in two. A merchant’s cart lies tipped in the mud, its wheels spinning, and the driver calls after you. You keep your eyes on the horizon. The shortcut through the crags is quicker, and night is coming. Every delay costs you daylight, and you have only yourself to rely on.',
    choices: {
      collab: {
        label: 'Help right the cart and travel with the others',
        result:
          'Four shoulders lift the cart free. The merchant, a quiet girl named Wren, falls into step beside you and points out a safer path toward the village.',
      },
      solo: {
        label: 'Take the crag shortcut, alone and fast',
        result:
          'You scramble over loose rock and reach the far side by dusk — muddy, bruised, and alone. The merchant’s cart is a speck behind you.',
      },
    },
  },
  {
    title: 'The River Crossing',
    image: 'assets/round-02.svg',
    alt: 'Travelers lash a log raft on a swollen river while slick stepping stones cross the water',
    supported:
      'The river is higher than the maps promised. Wren and two other travelers are already lashing logs into a raft, and they beckon you over. With enough hands, the crossing could be almost pleasant. The stepping stones are still there, slick and tempting.',
    strained:
      'The river is higher than the maps promised. No raft, no crew — just a line of stepping stones slick with moss, and cold water boiling beneath them. You’ll have to time every jump perfectly. There’s no one here to catch you if you slip.',
    choices: {
      collab: {
        label: 'Build the raft together and cross as a group',
        result:
          'The raft holds. Someone keeps the lantern dry while someone else steers. You reach the far bank with wet boots and dry spirits.',
      },
      solo: {
        label: 'Leap the stepping stones alone',
        result:
          'You make it across with a soaked pack and a twisted ankle. The raft builders watch from the bank, then turn away.',
      },
    },
  },
  {
    title: 'The Hungry Village',
    image: 'assets/round-03.svg',
    alt: 'Villagers gather with empty bowls in a quiet square while a communal meal is shared',
    supported:
      'The village of Lowfall is quieter than it should be. Its fields were washed out, and the families have gathered in the square with empty bowls. Your companions unpack their own rations without being asked. There is enough to share, if everyone gives a little.',
    strained:
      'The village of Lowfall is quieter than it should be. Its fields were washed out, and the families have gathered in the square with empty bowls. Your own pack is light. Sharing means going hungry on the road ahead, and the tower is still a long way off.',
    choices: {
      collab: {
        label: 'Share your rations and help cook a communal meal',
        result:
          'The square fills with the smell of stew. A farmer slips you a folded map of the old tower road, drawn by her grandmother.',
      },
      solo: {
        label: 'Eat your fill and slip out before they notice',
        result:
          'You eat in the shadow of the well and leave before anyone can ask. No one sees you go. No one waves goodbye.',
      },
    },
  },
  {
    title: 'The Broken Bridge',
    image: 'assets/round-04.svg',
    alt: 'Villagers haul timber planks across a broken stone bridge while a wayfinder and their fox scout work on the span',
    images: {
      none: {
        src: 'assets/round-04-none.svg',
        alt: 'Villagers haul timber planks across a broken stone bridge while a wayfinder watches from the near bank',
      },
    },
    supported:
      'The old stone bridge is split down the middle, but the villagers are already hauling timber with ropes and cheerful shouting. Pip darts across the narrowest span to tie a line. With the whole village pulling, the new planks will hold.',
    strained:
      'The old stone bridge is split down the middle. A single narrow beam remains, tilted over a drop that disappears into mist. The villagers watch from the safe side, unsure. Crossing it alone is possible. Probably.',
    choices: {
      collab: {
        label: 'Help haul timber and rebuild the bridge together',
        result:
          'The new planks creak but hold. The villagers cheer, and a barrel-chested blacksmith watches you with interest, hammer in hand.',
      },
      solo: {
        label: 'Cross the narrow beam without waiting',
        result:
          'You cross on the tilted beam, heart in your throat, and don’t look back. The villagers remain on the far side, small and still.',
      },
    },
  },
  {
    title: 'The Whispering Woods',
    image: 'assets/round-05.svg',
    alt: 'A fox scout leads companions along a glowing mushroom trail while a dark straight path tempts a lone traveler',
    images: {
      none: {
        src: 'assets/round-05-none.svg',
        alt: 'A lone wayfinder chooses between a glowing mushroom trail and a dark straight path through the woods',
      },
    },
    supported:
      'The woods lean in to listen. Glowing mushrooms mark a winding trail, and Pip trots ahead, ears high, barking at a path that only he can see. The others follow easily. The straight trail through the dark would be shorter — if you dared.',
    strained:
      'The woods lean in to listen. Glowing mushrooms mark a winding trail, but you can’t tell if they’re guiding you or something else. The straight trail through the dark would be shorter. You tighten your pack straps and keep your own counsel.',
    choices: {
      collab: {
        label: 'Follow Pip and the winding trail, staying together',
        result:
          'The trail opens into a clearing where the trees seem to bow. Wren finds a cache of dried fruit and leaves enough for the next traveler.',
      },
      solo: {
        label: 'Take the straight path and trust only yourself',
        result:
          'You push through the dark and reach the clearing first. Brambles tear your cloak. The others arrive later, quieter than before.',
      },
    },
  },
  {
    title: 'The Stranded Knight',
    image: 'assets/round-06.svg',
    alt: 'Travelers lift a boulder to free a stranded knight on a mountain pass, with a blacksmith and a lone path onward',
    images: {
      none: {
        src: 'assets/round-06-none.svg',
        alt: 'A stranded knight lies beneath a boulder on an empty mountain pass, with a solitary path onward',
      },
    },
    supported:
      'A knight’s armor glints beneath a fallen boulder on the mountain pass. A burly blacksmith is already measuring the rock with his hammer, and two others have found a lever. The knight is grateful, embarrassed, and clearly worth the trouble. The pass above is empty and unforgiving.',
    strained:
      'A knight’s armor glints beneath a fallen boulder on the mountain pass. He calls out as you approach, but the rock is enormous and the pass above is empty. Every minute spent here is a minute the long night gains on you.',
    choices: {
      collab: {
        label: 'Lift the rock together and free the knight',
        result:
          'The boulder rolls free. Sir Aldren swears an oath to carry the beacon torch with you — “many hands, many heartbeats,” he says.',
      },
      solo: {
        label: 'Leave him to the mountain and press on',
        result:
          'You climb the pass alone. Behind you, the knight’s calls grow faint, then stop.',
      },
    },
  },
  {
    title: 'The Tower Gate',
    image: 'assets/round-07.svg',
    alt: 'A wayfinder and companions turn the great iron wheel of the beacon tower gate while a fox scout checks the side latch',
    images: {
      none: {
        src: 'assets/round-07-none.svg',
        alt: 'A lone wayfinder faces the great beacon tower gate, weighing the iron wheel against a small side latch',
      },
      pip: {
        src: 'assets/round-07-pip.svg',
        alt: 'A wayfinder and their fox scout face the beacon tower gate, weighing the iron wheel against a small side latch',
      },
    },
    supported:
      'The beacon tower’s gate is a circle of iron with a wheel of spokes, built for many hands. Your party fits around it perfectly. Pip noses at a small side latch, Gorin tests the spokes, Aldren sets his shoulder. The gate will open. The question is whether you’ll wait for the slowest among you.',
    strained:
      'The beacon tower’s gate is a circle of iron with a wheel of spokes, built for many hands. There are no other hands here. A crowbar might work. It might also jam the mechanism forever. Night presses at your back.',
    choices: {
      collab: {
        label: 'Turn the wheel together, waiting for everyone',
        result:
          'The gate groans open. Inside, the stairwell is warm with old light, and your party files in as one.',
      },
      solo: {
        label: 'Force the side latch with your crowbar',
        result:
          'The latch gives with a crack. The gate shudders half-open and jams. You squeeze through alone, leaving the gap too narrow for anyone behind you.',
      },
    },
  },
  {
    title: 'The Storm',
    image: 'assets/round-08.svg',
    alt: 'Companions shelter together around a lantern in a storm while an exposed stair climbs into the rain',
    images: {
      none: {
        src: 'assets/round-08-none.svg',
        alt: 'A lone wayfinder climbs an exposed stair through a storm while a lantern glows in an empty shelter',
      },
      pip: {
        src: 'assets/round-08-pip.svg',
        alt: 'A wayfinder and their fox scout shelter beside a lantern in a storm while an exposed stair climbs into the rain',
      },
    },
    supported:
      'A storm rolls over the tower ridge, sudden and cold. Your party forms a tight circle of cloaks around a lantern; someone passes around a flask, someone else hums an old tune. Gorin anchors the lantern against the wind. You could keep climbing through it — but no one suggests it.',
    strained:
      'A storm rolls over the tower ridge, sudden and cold. There is no circle of cloaks, no flask, no hummed tune. Just wind, rain, and the narrow stair cut into the rock. You can keep climbing. You have to keep climbing.',
    choices: {
      collab: {
        label: 'Shelter together and wait out the storm',
        result:
          'The storm passes. In the quiet, a great grey owl lands on the railing and watches you with knowing eyes.',
      },
      solo: {
        label: 'Climb on through the storm',
        result:
          'You climb until your fingers go numb. The storm passes eventually, and you are still alone on the stair.',
      },
    },
  },
  {
    title: 'The Final Ascent',
    image: 'assets/round-09.svg',
    alt: 'Companions share the weight of a torch on the final spiral stair while a fox scout keeps pace',
    images: {
      none: {
        src: 'assets/round-09-none.svg',
        alt: 'A lone wayfinder races up the final spiral stair carrying the torch',
      },
      pip: {
        src: 'assets/round-09-pip.svg',
        alt: 'A wayfinder and their fox scout carry the torch up the final spiral stair',
      },
    },
    supported:
      'The last stair spirals into the beacon chamber. The torch is heavy, and the climb is steep, but hands reach for it from every side — Gorin’s grip, Aldren’s shoulder, Wren’s steady arm, Pip yipping at your heels. Together, the weight is nothing.',
    strained:
      'The last stair spirals into the beacon chamber. The torch is heavy and the climb is steep. Your arms burn. You could race ahead and be done with it, or turn and ask for help you haven’t earned. The tower is silent except for your breathing.',
    choices: {
      collab: {
        label: 'Carry the torch up together',
        result:
          'Many hands lift the torch to its cradle. For the first time all night, no one is holding their breath.',
      },
      solo: {
        label: 'Race ahead and seize the torch yourself',
        result:
          'You drag the torch up the final steps alone and hurl it into the cradle. It catches. The silence afterward is enormous.',
      },
    },
  },
  {
    title: 'The Beacon',
    image: 'assets/round-10.svg',
    alt: 'A wayfinder and companions wait at the railing of the cold beacon chamber above a sleeping valley',
    images: {
      none: {
        src: 'assets/round-10-none.svg',
        alt: 'A lone wayfinder holds the unlit torch in the cold beacon chamber above a sleeping valley',
      },
      pip: {
        src: 'assets/round-10-pip.svg',
        alt: 'A wayfinder and their fox scout stand at the railing of the cold beacon chamber',
      },
      'pip-gorin': {
        src: 'assets/round-10-pip-gorin.svg',
        alt: 'A wayfinder with Pip and Gorin waits at the railing of the cold beacon chamber above a sleeping valley',
      },
    },
    supported:
      'The beacon waits, cold and dark, with the whole valley spread below it. Your companions gather at the railing, waiting for your signal. This is the moment the stories will remember — not the torch, but who stood beside you when you lit it.',
    strained:
      'The beacon waits, cold and dark, with the whole valley spread below it. No one stands at the railing. The stories will remember only the light, and the cold hands that kindled it. Still, one choice remains.',
    choices: {
      collab: {
        label: 'Light the beacon with your friends beside you',
        result:
          'Flame takes. A hundred windows open across the valley, and a hundred voices call your name.',
      },
      solo: {
        label: 'Light the beacon alone',
        result:
          'Flame takes. The valley glows below you. You listen for a voice that isn’t the wind.',
      },
    },
  },
];

const ENDINGS = {
  friends: {
    min: 8,
    title: 'The Circle of Friends',
    image: 'assets/ending-friends.svg',
    alt: 'A joyful circle of friends celebrates around a blazing beacon as the valley rebuilds at sunrise',
    images: {
      'pip-gorin': {
        src: 'assets/ending-friends-no-sable.svg',
        alt: 'A joyful circle of friends celebrates around a blazing beacon while Pip wears a ribbon',
      },
    },
    epigraph: 'You did not walk alone, and the road remembered it.',
    text: 'By morning, the beacon’s light has drawn every household in Lowfall to the tower steps. Wren maps the new roads, Gorin rebuilds the bridge properly, Aldren stands watch, and Pip steals the ceremonial ribbon. Sable roosts above the door and offers advice only when asked. You are not the hero of this story — you are the person who made heroes possible. The valley prospers, and every winter, on the longest night, your friends light the beacon together and save you a place at the fire.',
  },
  mixed: {
    min: 4,
    title: 'A Road Half-Shared',
    image: 'assets/ending-mixed.svg',
    alt: 'A small group stands beside a lit beacon under a grey sky while other figures remain apart',
    epigraph: 'Some doors opened. Others stayed closed.',
    text: 'The beacon burns, and the long night breaks. Some faces are there to see it: a few who trusted you, a few you helped when it cost you nothing. Others kept their distance, and you understand why. You rebuild what can be rebuilt and leave the rest as a lesson. Life goes on — warm in places, cold in others. You are neither lonely nor entirely at home, and sometimes, on quiet evenings, you wonder which choices you would make again.',
  },
  alone: {
    min: 0,
    title: 'The Long Road Alone',
    image: 'assets/ending-alone.svg',
    alt: 'A lone wayfinder silhouetted against a cold beacon flame above a dark sleeping valley',
    epigraph: 'The light was yours. So was the silence.',
    text: 'The beacon lights the valley, and the long night ends. By dawn you are still the only person on the tower. Below, the villages sleep behind unlit windows; no one thought to watch for the signal, because no one expected you to succeed. You did it. That’s the story they’ll tell, if they tell it at all — one wayfinder, one torch, one cold light. You are safe, and successful, and entirely alone. The fire warms your hands, but it cannot warm the space beside you.',
  },
};

function getEnding(score) {
  if (score >= ENDINGS.friends.min) return ENDINGS.friends;
  if (score >= ENDINGS.mixed.min) return ENDINGS.mixed;
  return ENDINGS.alone;
}
