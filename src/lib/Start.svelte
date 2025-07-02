<script lang="ts">
  import { route } from './route.svelte.ts';
  import { searchLocation } from './api.ts';

  let editLocation = $state(true);
  let editTime = $state(false);
  let foundLocations = $state([]);

  function inputChange(ev) {
    searchLocation(ev.target.value).then((value) => {
      foundLocations = value;
    });
  }

  function selectLocation(loc) {
      route.startLocation = loc;
      editLocation = false;
      foundLocations = [];
  }

  function changeLocation() {
      editLocation = true;
      searchLocation(route.startLocation.name).then((value) => {
        foundLocations = value;
      });
  }

  function currentStartLocation() {
    if (route.startLocation === null) {
      return ""
    }
    else {
      return route.startLocation.name
    }
  }

  function changeTime() {
      editTime = true;
  }

</script>

<div id="routeStart">
  <label for="startLocation">Start:</label>
  <div id="startLocation">
    {#if editLocation }
      <div>
        <input class="locationInput"
               name="location"
               oninput={inputChange}
               value={currentStartLocation()}
        />
      </div>
      <div>
        <div class="locationList">
          {#each foundLocations as location }
            <button onclick={ (ev) => { selectLocation(location) }}>
              <p class="name">{ location.name }</p>
              <p class="areas">
                {#each location.areas as area }<span>{ area.name }</span>{/each}
              </p>
              <p class="id">
                { location.id }
              </p>
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <button class="locationInput" onclick={ changeLocation }>
          { route.startLocation.name }
      </button>
    {/if}
  </div>
  <label for="startTime">at:</label>
  <div id="startTime">
    {#if editTime }
      <p>edit time</p>
    {:else}
      <button class="locationInput" onclick={ changeTime } >
        {#if route.startTime === null }
          now
        {:else}
          { route.startTime }
        {/if}
      </button>
    {/if}
  </div>
</div>

<style>
  #routeStart {
    display: grid;
    grid-template-columns: min-content auto;

    > label {
        text-align: right;
        padding-right: 0.5rem;
    }

    > * {
      margin-top: 0.5rem;
    }

    p {
        margin: 0;
        padding: 0;
    }
  }

  .locationInput {
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    font-size: medium;
    background-color: inherit;
    border: 1px solid var(--border-color);
    border-radius: 0.1rem;
    padding: 0.1rem 0.3rem;
  }

  .locationList {
    list-style: none;
    padding-left: 0;
    
    > button {
      display: block;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-size: 100%;
      cursor: pointer;
      padding: 0.1em 0.4em;

      &:hover {
          background: #f0f0ff;
      }

      .areas {
          font-size: x-small;

          span:not(:first-child)::before {
            content: " – ";
          }
      }
      .id {
          font-size: x-small;
      }
    }
  }
</style>
