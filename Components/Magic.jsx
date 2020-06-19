import React from 'react'
import * as Tone from "tone";

// create synth route to master
const synth = new Tone.Synth().toMaster();


synth.triggerAttackRelease("C4", "4n");

export default function Magic(){
  return(
    <div>asdfasdf</div>
    )
}