import getHikingTrails from "../../src/pages/api/getTrails/getHikingTrails";
import findUser from '../../src/helpers/user/findUser';
import filterByWeather from "../../src/pages/api/filter/filterByWeather";
import {fetchWrapper} from "../../src/helpers/fetchWrapper";

jest.mock("../../src/helpers/fetchWrapper");

test("filterByWeather takes the response of getHikingTrails", async () => {
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //gathers user data using findUser 
    const user = "testAdminUser123";
    const result = findUser(user);

    //build request object using user data
    const request = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            
            "lat": result.homeLocation.lat,
            "lon": result.homeLocation.long,
            "radius": result.maxTravelRadius,
        })
    }

    fetchWrapper.get.mockImplementation(() => {
        return ({
            '3944': {
              name: 'Anacortes Community Forest Lands',
              city: 'Anacortes',
              state: 'Washington',
              country: 'United States',
              description: 'Anacortes Community Forest Lands features 20 miles of hiking trails near Anacortes, WA.',
              directions: 'From I5, head west towards Anacortes on Highway 20 in Burlington. Get on Comercial and head down about 3-4 blocks to Anacortes Cyclery. Ask the guys in there directions to the Anacortes Community Forest Land. (I use the back route, but it is way to complicated)',
              lat: '48.5043',
              lon: '-122.6453',
              parent_id: '0',
              place_id: '3944',
              activities: { hiking: [Object] }
            },
            '3952': {
              name: 'Spruce R.R. Trail',
              city: 'Port Angeles',
              state: 'Washington',
              country: 'United States',
              description: 'Spruce R.R. Trail features 11 miles of hiking trails near Port Angeles, WA.',
              directions: 'W on 101 from Port Angeles, WA 25 miles to a right on East shore dr. 3 miles to the end/trailhead (parking- bathrooms).&lt;br /&gt;Option #2- follow 101 another 9 miles to a right at Fairholm, follow rd 3.3 miles to the N shore picnic area and park there.&lt;br /&gt;',
              lat: '48.0934',
              lon: '-123.8028',
              parent_id: '0',
              place_id: '3952',
              activities: { hiking: [Object] }
            },
            '3953': {
              name: 'Fort Ebby St Park',
              city: 'Coupville/whidbey Is',
              state: 'Washington',
              country: 'United States',
              description: 'Fort Ebby St Park features 25 miles of hiking trails near Coupville/whidbey Is, WA.',
              directions: 'First get onto Whidbey Island either via the ferry, Mukeltio to Clinton or driving around and coming down over Deception Pass bridge. From Clinton take Hwy 525 N to 20 E, a total of about 25 miles. Take a left on Libbey rd and follow the signs to the park. It is well worth stopping by the Park office for a free trail map.',
              lat: '48.2226',
              lon: '-122.7635',
              parent_id: '0',
              place_id: '3953',
              activities: { hiking: [Object] }
            },
            '3988': {
              name: 'Heart Lake - Acfl',
              city: 'Anacortes',
              state: 'Washington',
              country: 'United States',
              description: 'Heart Lake - Acfl features 10 miles of hiking trails near Anacortes, WA.',
              directions: 'The ACFL areas are planned community-wise so there are many access points from small neighborhoods, most of these however do not have much in the way of public parking. The following are trailheads with public parking;&lt;br /&gt;&lt;br /&gt;1. From Commercial ave (the main st) in Anacortes turn West on 32 st and follow it to H ave, turn left (south) onto H and follow it about a mile where it turns into Heart Lake rd, about .5 mile farther is a right turn into large parking lot for Heart Lake, several trails start here. Also, one access for the Whistle Lake area is directly across main rd.&lt;br /&gt;&lt;br /&gt;2. Continuing on Heart Lake rd .5 mile there is parking on the left at the intersection of Mt Erie rd, another access pt for Whistle Lake area, Heart Lake trails are across main road through a gate.&lt;br /&gt;&lt;br /&gt;',
              lat: '48.4675',
              lon: '-122.6303',
              parent_id: '0',
              place_id: '3988',
              activities: { hiking: [Object] }
            },
            '4001': {
              name: 'Adventure Route Segment Of The Odt',
              city: 'Port Angeles',
              state: 'Washington',
              country: 'United States',
              description: 'Adventure Route Segment Of The Odt features 26 miles of hiking trails near Port Angeles, WA.',
              directions: 'Drive to Port Angeles on US 101, drive through Port Angeles towards Forks and 4 miles west of Port Angeles turn right onto SR 112 towards Joyce.  Once on SR 112 you drive 1.5 miles to trailhead beside SR 112 just west of the Elwha River Bridge crossing.  Look for wooden entrance sign and kiosk with trail map on left side of the road.  You can access the west end of the trail from the center of the Joyce Piedmont Road just south of the Joyce Crescent School or farther west at the Spruce Railroad Trail trailhead on Lake Crescent where you would ride back to the east across the Lyre River bridge and turn south up the Lyre River gravel road for 3 miles to intersect the west end of the singletrack trail.',
              lat: '48.1113',
              lon: '-123.5639',
              parent_id: '0',
              place_id: '4001',
              activities: { hiking: [Object] }
            },
            '15884': {
              name: 'Deception Pass State Park',
              city: 'Oak Harbor',
              state: 'Washington',
              country: 'United States',
              description: '1.2 miles of ADA accessible trails; excellent hiking.',
              directions: 'Located nine miles north of Oak Harbor, Wash. and nine miles south of Anacortes, on Whidbey Island in Puget Sound in Island County.',
              lat: '48.3971',
              lon: '-122.6545',
              parent_id: '0',
              place_id: '15884',
              activities: { hiking: [Object] }
            },
            '15893': {
              name: 'Fort Ebey State Park',
              city: 'Coupeville',
              state: 'Washington',
              country: 'United States',
              description: 'Panoramic views of the Puget Sound shoreline, the Olympic Mountains and sunsets. The park features paragliding, surfing and gun batteries to explore. Eagles may be viewed at Lake Pondilla.',
              directions: 'Located on Whidbey Island, two miles north of Coupeville, Wash., and eight miles south of Oak Harbor, Wash. in Island County.',
              lat: '48.2234',
              lon: '-122.7569',
              parent_id: '0',
              place_id: '15893',
              activities: { hiking: [Object] }
            },
            '15908': {
              name: 'James Island State Park',
              city: 'Anacortes',
              state: 'Washington',
              country: 'United States',
              description: 'James Island offers great short hikes with dramatic views from high bluffs. Hikers with children should be aware of fall hazards due to rocky high banks and cliffs and surrounding waters that are deep and swift.',
              directions: 'James Island is located three miles west of Anacortes and half-mile east of Decatur Island on Rosario Strait in San Juan County.',
              lat: '48.5095',
              lon: '-122.7931',
              parent_id: '0',
              place_id: '15908',
              activities: { hiking: [Object] }
            },
            '15912': {
              name: 'Joseph Whidbey State Park',
              city: 'Coupeville',
              state: 'Washington',
              country: 'United States',
              description: 'ADA accessible trail.',
              directions: 'Located three miles west of Oak Harbor, Wash. in Island County.',
              lat: '48.3106',
              lon: '-122.7020',
              parent_id: '0',
              place_id: '15912',
              activities: { hiking: [Object] }
            },
            '15926': {
              name: 'Lime Kiln Point State Park',
              city: 'Anacortes',
              state: 'Washington',
              country: 'United States',
              description: 'ADA hiking.',
              directions: 'Located on San Juan Island, accessible by ferry from Anacortes.',
              lat: '48.5156',
              lon: '-123.1492',
              parent_id: '0',
              place_id: '15926',
              activities: { hiking: [Object] }
            },
            '15933': {
              name: 'Moran State Park',
              city: 'Olga',
              state: 'Washington',
              country: 'United States',
              description: 'Moran State Park is a 5,252-acre camping park with five freshwater lakes and over 30 miles of hiking trails. Atop the 2,409-foot-high Mt. Constitution, the highest point on the San Juan Islands, there stands a stone observation tower built by the Civilian Conservation Corps in 1936. The tower offers panoramic views of the surrounding islands, the Cascade Mountains and a variety of Canadian and American cities.',
              directions: 'Located five miles south of Eastsound, Wash. in San Juan County.',
              lat: '48.6676',
              lon: '-122.8229',
              parent_id: '0',
              place_id: '15933',
              activities: { hiking: [Object] }
            },
            '15939': {
              name: 'Obstruction Pass State Park',
              city: 'Anacortes',
              state: 'Washington',
              country: 'United States',
              description: 'There is a self-guided interpretive trail along the 0.6-mile trail to Obstruction Pass beach. The trail includes information about the geology, ecology and the cultural significance of Obstruction Pass and Orcas Island.',
              directions: 'Take Highway 20 exit westbound to Anacortes. Follow signs to San Juan/Sidney B.C. ferries. Take the ferry to Orcas Island. Turn left after exiting the ferry, and follow signs to Moran State Park (approximately 14 miles). Drive through Moran and turn left at the Olga Artworks. After a half-mile take a right on to Obstruction Pass road. Follow the road to the trailhead and parking lot. It is a 0.6 mile hike to the campground and beach.',
              lat: '48.6052',
              lon: '-122.8275',
              parent_id: '0',
              place_id: '15939',
              activities: { hiking: [Object] }
            },
            '15967': {
              name: 'Sequim Bay State Park',
              city: 'Sequim',
              state: 'Washington',
              country: 'United States',
              description: 'The Olympic Discovery Trail is a paved county maintained trail that travels from Port Angeles through the park.',
              directions: 'Located about three miles southeast of Sequim, Wash., on Hwy. 101 and Sequim Bay in Clallam County.',
              lat: '48.0420',
              lon: '-123.0291',
              parent_id: '0',
              place_id: '15967',
              activities: { hiking: [Object] }
            },
            '15971': {
              name: 'Spencer Spit State Park',
              city: 'Lopez Island',
              state: 'Washington',
              country: 'United States',
              description: 'Excellent short hikes.',
              directions: 'Located on Lopez Island in the San Juan Island cluster, a 45-minute ferry ride from Anacortes, Wash. in San Juan County.',
              lat: '48.5368',
              lon: '-122.8598',
              parent_id: '0',
              place_id: '15971',
              activities: { hiking: [Object] }
            },
            '15978': {
              name: 'Stuart Island State Park',
              city: 'Red Harbor',
              state: 'Washington',
              country: 'United States',
              description: 'Stuart Island State Park is an 85-acre marine camping park with 33,030 feet of shoreline. The park is part of the Cascadia Marine Trail and offers camping and moorage at Reed and Prevost harbors. Some campsites are for the exclusive use of those arriving by human- or wind-powered watercraft.',
              directions: 'The park is reachable only by boat. The nearest access is four miles southeast at Roche Harbor Resort on San Juan Island. The entrance to Reid Harbor is partially blocked by two small islands. Boaters should keep these islands to their starboard when entering the harbor.',
              lat: '48.6748',
              lon: '-123.2056',
              parent_id: '0',
              place_id: '15978',
              activities: { hiking: [Object] }
            },
            '15979': {
              name: 'Sucia Island State Park',
              city: 'Anacortes',
              state: 'Washington',
              country: 'United States',
              description: "Sucia Island State Park is a 564-acre marine park with 77,700 feet of shoreline. Sucia Island is considered the crown jewel of the state's marine park system. It is consistently ranked as one of the top boating destinations in the world. Sucia Island and several smaller island comprise the &quot;Sucia group.&quot;",
              directions: 'The park is accessible only by boat. There is no commercial ferry service to the island.  Sucia Island is 2.5 miles north of Orcas Island. The closest access points are Obstruction Pass on Orcas Island, Point Roberts, Blaine Harbor, Anacortes, and Squallicum Harbor in Bellingham.',
              lat: '48.7541',
              lon: '-122.9049',
              parent_id: '0',
              place_id: '15979',
              activities: { hiking: [Object] }
            },
            '19890': {
              name: 'Bamberton Provincial Park',
              city: 'Mill Bay',
              state: 'British Columbia',
              country: 'Canada',
              description: 'A 1.5 km trail connects the campground to the beach at the day-use area. This trail is steep in parts. The route from the day-use parking lot to the beach is wheelchair accessible and paved. For your own safety and preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroy plant life and soil structure.',
              directions: 'The park is located on southern Vancouver Island, approximately 45 km north of Victoria off Highway 1. Turn east off Highway 1 onto Mill Bay Road, near the north end of the scenic Malahat Drive. BC Ferries offers service from Mill Bay to Brentwood Bay, a distance of 8 km by sea with a crossing time of 25 minutes. Bamberton Park is located a 5-minute drive south of Mill Bay. Nearby communities include: Mill Bay, Shawnigan Lake, Cobble Hill, Duncan, Victoria.',
              lat: '48.6041',
              lon: '-123.5272',
              parent_id: '0',
              place_id: '19890',
              activities: { hiking: [Object] }
            },
            '19902': {
              name: 'Bellhouse Provincial Park',
              city: 'Galiano Island',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Bellhouse Provincial Park is a day-use park on Galiano Island Located on Burril Point, this park offers hiking, canoeing, kayaking and fishing for visitors to enjoy!',
              directions: 'Bellhouse Provincial Park is located 1 km west of Sturdies Bay on Galiano Island in the southern Gulf Islands. Galiano Island can be reached via BC Ferry service from Swartz Bay north of Victoria (approximately 1 hour). Once on Galiano head north on Sturdies Bay Road, turn left Burrill Road, then left again on Jack Road until you reach the park.',
              lat: '48.8731',
              lon: '-123.3143',
              parent_id: '0',
              place_id: '19902',
              activities: { hiking: [Object] }
            },
            '19922': {
              name: 'Bodega Ridge Provincial Park',
              city: 'Galiano Island',
              state: 'British Columbia',
              country: 'Canada',
              description: 'A 4 km trail through the park is accessible via Cottage Way. This trail leads uphill along the top of Bodega Ridge, through the forested area and along the cliff edge, ending at the northern boundary of the park. A large portion of this hike is uphill with the remaining portion adjacent to the cliff edge. The top of the ridge can be reached in approximately 30 minutes. Please stay on designated trail and away from cliff edge. Please respect vegetation in the area as it is sensitive to human disturbance.',
              directions: 'Bodega Ridge Provincial Park is located on Galiano Island in the southern Gulf Islands. Galiano Island can be reached via BC Ferry service from Swartz Bay north of Victoria (approximately 1 hour). The park is situated approximately three-quarters of the way along the island from the ferry terminal and is accessible by Cottage Way from Porlier Pass Road.',
              lat: '48.9575',
              lon: '-123.5411',
              parent_id: '0',
              place_id: '19922',
              activities: { hiking: [Object] }
            },
            '19938': {
              name: 'Bright Angel Park',
              city: 'Cowichan',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Bright Angel Park offers plenty of opportunities for outdoor lovers in British Columbia. There are plenty of winding trails through the woods here so hiking and trail running are not in short supply. Other activities include swimming, canoeing, boating, kayaking and camping.',
              directions: 'Head west off of Trans-Canada Highway onto Koksilah Rd. and take a right onto Tigwell Rd.',
              lat: '48.7332',
              lon: '-123.6857',
              parent_id: '0',
              place_id: '19938',
              activities: { hiking: [Object] }
            },
            '19984': {
              name: 'Chemainus River Provincial Park',
              city: 'Duncan',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Chemainus River Provincial Park is a smaller, 294-acre provincial park on southern Vancouver Island. There are recreational opportunities here for hiking, swimming, canoeing, kayaking, fishing, horseback riding and mountain biking.',
              directions: 'The nearest cities or towns are Duncan and Cowichan.',
              lat: '48.8378',
              lon: '-123.8360',
              parent_id: '0',
              place_id: '19984',
              activities: { hiking: [Object] }
            },
            '20033': {
              name: 'Cowichan River Provincial Park',
              city: 'Duncan',
              state: 'British Columbia',
              country: 'Canada',
              description: 'A maze of developed and undeveloped routes offers significant walking and hiking opportunities in and around Cowichan River Provincial Park.',
              directions: 'Skutz Falls Road/West Access: Located off Highway 18, Skutz Falls Road provides access to Skutz Falls day-use area, Horseshoe Bend Group Campsite, Marie Canyon day-use area and the Skutz Falls Trailhead of the Cowichan River Trail. Follow signs from Skutz Falls Road via Cowichan Lake Road and Mayo Road to Riverbottom Road.  Highway 18 Connector/Middle Access: Located off Highway 18, the Highway 18 Connector provides access to the Stoltz Pool campground, group campsite and day-use areas. Follow signs to Riverbottom Road.  Robertson Road/South East Access: Located on Robertson Road in the Glenora area south of Duncan. To access this point proceed west on Glenora Road, turn right onto Vaux Road and continue down Vaux Road, as it leads into Robertson Road. This provides access to the Glenora Trailhead of the Cowichan River Trail.',
              lat: '48.7673',
              lon: '-123.8868',
              parent_id: '0',
              place_id: '20033',
              activities: { hiking: [Object] }
            },
            '20060': {
              name: 'Discovery Island Marine Provincial Park',
              city: 'Victoria',
              state: 'British Columbia',
              country: 'Canada',
              description: 'One main trail provides a junction to reach various points in the park - head east to visit the area around the lighthouse; head west to visit the open grass fields and rocky shoreline. Designated trails provide access to the area around the lighthouse to the east and to the open grass fields to the west of the park. Please remain within the park boundary - the area to the north of the boundary is private First Nations land and is not open to the public.',
              directions: 'Discovery Island Marine Provincial Park is located two nautical miles east of Victoria on southern Vancouver Island. Access to the park is by boat only; the nearest boat launch is located at Cattle Point in Oak Bay, Victoria. Boaters can reference marine chart #3424, #3440 and #3461 for more information on this area.',
              lat: '48.4548',
              lon: '-123.2661',
              parent_id: '0',
              place_id: '20060',
              activities: { hiking: [Object] }
            },
            '20125': {
              name: 'French Beach Provincial Park',
              city: 'Sooke',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Approximately 2 kilometres of maintained hiking trails travel through the park. Trails lead through salt marsh and second-growth forest of Douglas fir, Sitka spruce, Western hemlock and Western red cedar, connecting with shoreline walks along the beautiful beach. This trail system is accessible from the day use area and the campground. For your own safety and the preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroys plant life and soil structure.',
              directions: 'French Beach Provincial Park is located on the west coast of southern Vancouver Island. The park can be accessed via Hwy 14, 20 km west of Sooke. Directional signs are posted. The park is located approximately 11 km from Jordan River. Nearest communities, towns or cities are Sooke, Jordan River, Port Renfrew, Victoria.',
              lat: '48.3950',
              lon: '-123.9423',
              parent_id: '0',
              place_id: '20125',
              activities: { hiking: [Object] }
            },
            '20142': {
              name: 'Goldstream Provincial Park',
              city: 'Victoria',
              state: 'British Columbia',
              country: 'Canada',
              description: 'An extensive network of trails winds through Goldstream Provincial Park, totaling a distance of approximately 16 km. Trails start from both the day-use area and campground and range from easy walks, including short 5-15 minute walks along the river bank and through tall timber, to harder hikes. Some of the longer trails may take several hours to hike. For your own safety and preservation of the park, hike only on marked trails and obey posted signs. The ecosystems of this park are rare and fragile. Shortcutting trails destroys plant life and soil structure.',
              directions: 'Goldstream Provincial Park is located 16 km northwest of Victoria on southern Vancouver Island on the Trans Canada Hwy (Hwy #1).',
              lat: '48.4709',
              lon: '-123.5521',
              parent_id: '0',
              place_id: '20142',
              activities: { hiking: [Object] }
            },
            '20144': {
              name: 'Gowlland Tod Provincial Park',
              city: 'Brentwood Bay',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Gowlland Tod Provincial Park is a 3,012.21-acre park on South Vancouver Island. This park protects an important part of the Gowlland Range which is one of the last remaining natural areas in Greater Victoria. Activities here include hiking, swimming, canoeing, kayaking, mountain biking and horseback riding.',
              directions: 'The park is located on the east side of Saanich Inlet on Southern Vancouver Island. There are three park accesses: Tod Inlet, Mackenzie Bight and Caleb Pike.&lt;br /&gt;&lt;br /&gt;The Tod Inlet access is located near Brentwood Bay, off Wallace Drive; Mackenzie Bight access is located off Rossdurrance Road, off Willis Point Road; the Caleb Pike access is on Caleb Pike Road, off Millstream Road near Langford. Gowlland Tod Park can also be accessed by boat via Tod Inlet.',
              lat: '48.5420',
              lon: '-123.5237',
              parent_id: '0',
              place_id: '20144',
              activities: { hiking: [Object] }
            },
            '20199': {
              name: 'John Dean Provincial Park',
              city: 'Sidney',
              state: 'British Columbia',
              country: 'Canada',
              description: 'John Dean Provincial Park has approximately 6 km of hiking trails, ranging from easy walks to more difficult hikes through beautiful old-growth Douglas fir and Garry oak ecosystems. A main park map is located at the information shelter, as well as trail maps at various points along the trail system. Portions of the trail system can be steep and are geared to more advanced hikers. Refer to park map for more information and routes.',
              directions: 'John Dean Provincial Park is located near Sidney on southern Vancouver Island. The park can be accessed off Hwy #17. Turn west onto McTavish Road, south onto East Saanich Road, then west onto John Dean Road. Follow John Dean Road until you reach the park.',
              lat: '48.6136',
              lon: '-123.4450',
              parent_id: '0',
              place_id: '20199',
              activities: { hiking: [Object] }
            },
            '20239': {
              name: 'Koksilah River Provincial Park',
              city: 'Shawnigan Lake',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Koksilah River Park has no developed trails, however there are a number of good existing routes that lead to the river and throughout the forest and park.',
              directions: 'Koksilah River Provincial Park is located 7 km west of Shawnigan Lake, on Southern Vancouver Island. Turn west off Hwy #1 at Shawnigan/Mill Bay Road in Mill Bay. Follow the road to Shawnigan Lake, then turn right onto Shawnigan Lake Road. Renfrew Road, a logging road, provides access to the park. Nearby communities include Shawnigan Lake, Cowichan Bay, Mill Bay and Duncan.',
              lat: '48.6424',
              lon: '-123.7440',
              parent_id: '0',
              place_id: '20239',
              activities: { hiking: [Object] }
            },
            '20301': {
              name: 'Montague Harbour Marine Provincial Park',
              city: 'Galiano Island',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Montague Harbour Marine Provincial Park is a very small park consisting of only a little over 200 acres. However, because it sits on the Trincomali Channel there is plenty of room for hiking, swimming, boating, canoeing, kayaking, fishing, mountain biking and camping.',
              directions: 'Montague Harbour Marine Provincial Park is located on the southwest side of Galiano Island approximately 10 km northwest of Sturdies Bay. BC Ferries provides vehicle and passenger service to Sturdies Bay from Swartz Bay on Vancouver Island and from Tsawwassen, south of Vancouver. The park is located on Montague Park Road; follow signs to the park from the ferry terminal. Boaters can reference marine chart #3442, #3462, #3463 and #3473 for more information on this area.',
              lat: '48.9021',
              lon: '-123.4016',
              parent_id: '0',
              place_id: '20301',
              activities: { hiking: [Object] }
            },
            '20313': {
              name: 'Mount Erskine Provincial Park',
              city: 'Victoria',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Three trails lead to Mount Erskine Provincial Park from surrounding private lands.',
              directions: 'Mount Erskine Provincial Park is located on Salt Spring Island, in the southern Gulf Islands. BC Ferries offers service to Salt Spring Island from Victoria (Swartz Bay) and Crofton on Vancouver Island, and Vancouver (Tsawwassen).',
              lat: '48.8469',
              lon: '-123.5503',
              parent_id: '0',
              place_id: '20313',
              activities: { hiking: [Object] }
            },
            '20317': {
              name: 'Mount Maxwell Provincial Park',
              city: 'Salt Spring Island',
              state: 'British Columbia',
              country: 'Canada',
              description: "Mount Maxwell Provincial Park offers a number of walking/hiking opportunities with spectacular views. Approximately 6 km of maintained trails all start at the parking lot and range from easy strolls to more demanding hikes. Trails to the north and east travel through wooded areas of old-growth and second-growth Douglas fir. The trail to the west follows along the ridge of Mount Maxwell and links up with the park entrance road approximately 2 km from the parking lot. Excellent views can be had from various points along the trails, particularly at Baynes Peak, Salt Spring Island's highest point. From here visitors can get a panoramic look at Vancouver Island, the surrounding Gulf Islands and the mainland of British Columbia.",
              directions: 'Mount Maxwell Provincial Park is located on Salt Spring Island, in the southern Gulf Islands. BC Ferries offers service to Salt Spring Island from Victoria (Swartz Bay) and Crofton on Vancouver Island, and Vancouver (Tsawwassen). From the Salt Spring ferry terminal, head south on the Fulford Ganges Road to Cranberry Road. Turn left at the junction with Mount Maxwell Road and continue slowly on the rough road to the park. This gravel road is steep and narrow and bumpy; caution should be taken when traveling this road.',
              lat: '48.8042',
              lon: '-123.5191',
              parent_id: '0',
              place_id: '20317',
              activities: { hiking: [Object] }
            },
            '20437': {
              name: 'Ruckle Provincial Park',
              city: 'Ganges',
              state: 'British Columbia',
              country: 'Canada',
              description: 'An extensive trail system exists at Ruckle Park, with more than 15 km of trail. A shoreline trail runs from the heritage farm area right through to Yeo Point, along with other inland trail routes that range from easy walks to more difficult hikes. Detailed park trail maps are located at information shelters and convenient points along the trails. For your own safety and the preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroys plant life and soil structure.',
              directions: 'Located on Salt Spring Island in the southern Gulf Islands, Ruckle Provincial Park is situated 10 km from the Fulford Harbour ferry terminal along Beaver Point Road. BC Ferries offers service to Salt Spring Island from Victoria (Swartz Bay) and Crofton on Vancouver Island, and Vancouver (Tsawwassen).',
              lat: '48.7729',
              lon: '-123.3779',
              parent_id: '0',
              place_id: '20437',
              activities: { hiking: [Object] }
            },
            '20484': {
              name: 'Sooke Mountain Provincial Park',
              city: 'Sooke',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Sooke Mountain Provincial Park is a 1,112-acre park near Sooke, BC. This park protects the rugged rocky hills, lakes, forested slopes and the watershed near Sooke River. Activities here include hiking, fishing and camping.',
              directions: 'There is no road access or motorized vehicle use in this park.  Walk/hiking access is via Harbour View Road and visitors must be prepared to wade across Charters River as there are no bridges.',
              lat: '48.4398',
              lon: '-123.6581',
              parent_id: '0',
              place_id: '20484',
              activities: { hiking: [Object] }
            },
            '20493': {
              name: 'Spectacle Lake',
              city: 'Bradleyville',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Spectacle Lake Provincial Park is home to mature forest, lake and wetlands. Located northwest of Victoria, in the Nanaimo Lowlands Ecosection, this park is one of few accessible freshwater lakes that allows fishing, swimming and in the winter, skating.<br /><br />An easy hiking trail winds around the lake for more than 2 kilometers. It circles the lake, with wooden bridges crossing the numerous creeks and a marshy area feeding into Spectacle Lake. Much of this trail system is wheelchair accessible. The main trail also unofficially links up to various regional trails outside of the park boundaries. For your own safety and the preservation of the park, obey posted signs and keep to designated trails. Shortcutting trails destroys plant life and soil structure.',
              directions: '48.57726,-123.572466',
              lat: '48.5748',
              lon: '-123.5714',
              parent_id: '0',
              place_id: '20493',
              activities: { hiking: [Object] }
            },
            '20580': {
              name: 'Wallace Island Marine Provincial Park',
              city: 'Galiano Island',
              state: 'British Columbia',
              country: 'Canada',
              description: 'Wallace Island Marine Provincial Park is an island in the Trincomali Channel that lies adjacent to Bodega Ridge Provincial Park. This park is only 178 acres but it has recreational opportunities for hiking, swimming, canoeing, kayaking, fishing and camping.',
              directions: 'Wallace Island Marine Provincial Park is only accessible by boat. This park lies in Trincomali Channel between Galiano Island and the northern tip of Saltspring Island, off southern Vancouver Island. Boats can enter the sheltered anchorages at Princess Bay and Conover Cove from Houston Channel. Boaters can reference marine chart #3442 and #3463 for more information on this area.',
              lat: '48.9575',
              lon: '-123.5411',
              parent_id: '0',
              place_id: '20580',
              activities: { hiking: [Object] }
            },
            '24318': {
              name: 'Cattle Point',
              city: 'Cattle Point',
              state: 'Washington',
              country: 'United States',
              description: 'Excellent hiking area.',
              directions: 'Access to the site is along a paved San Juan County public road Cattle Point road. Parking is limited. Additional parking is available nearby at the WA DNR, Cattle Point Interpretive Center. Currently a Washington State Discovery Pass is required to park at the DNR site.',
              lat: '48.4504',
              lon: '-122.9630',
              parent_id: '0',
              place_id: '24318',
              activities: { hiking: [Object] }
            },
            '24325': {
              name: 'Iceberg Point',
              city: 'Lopez Island',
              state: 'Washington',
              country: 'United States',
              description: 'Excellent hiking area.',
              directions: 'Iceberg Point is located on the southwest tip of Lopez Island. Drive south on Mud Bay Road. Turn Right on Mackaye Harbor road to the County Park at Agate Beach. Park at Agate Beach, County Park, Day-use area. Hike south along the Mackaye Harbor road past where the &quot;End of County Road&quot; signs are posted. At this point you will be entering private land- Please be respectful of the property-. Turn Right at the driveway with a green metal gate. Hike around this gate on the right side, and then left at the fork in the road behind the next gate. Follow this trail for about 1/2 mile to access BLM lands.',
              lat: '48.4882',
              lon: '-122.8958',
              parent_id: '0',
              place_id: '24325',
              activities: { hiking: [Object] }
            },
            '24329': {
              name: 'Patos Islands',
              city: 'Patos Islands',
              state: 'Washington',
              country: 'United States',
              description: 'Nice trail. Moderate.',
              directions: 'The park is located five miles northwest of Orcas Island in San Juan County. Patos Island State Park is accessible only by boat. There is no commercial ferry service to the park. The nearest launch sites are at Point Roberts Marina (13 miles north), Blaine Harbor (11 miles northeast), and Squallicum Harbor in Bellingham (24 miles east).',
              lat: '48.7648',
              lon: '-122.9108',
              parent_id: '0',
              place_id: '24329',
              activities: { hiking: [Object] }
            },
            '24333': {
              name: 'Watmough Bay',
              city: 'Lopez Village',
              state: 'Washington',
              country: 'United States',
              description: 'Nice short trail.',
              directions: 'Drive south from Lopez Village on Fisherman Bay Road. Keep left onto Mud Bay Road, turn right at Aleck Bay Road, then left on Watmough Bay Road. Follow this road approximately 1 1/2 miles, then turn left at hte bottom of a small hill, at the Watmough Bay Sign. Please park in the trailhead parking area.',
              lat: '48.5243',
              lon: '-122.9132',
              parent_id: '0',
              place_id: '24333',
              activities: { hiking: [Object] }
            }
          })
    })

    await getHikingTrails(request, response);

    //holds reult of getHikingTrails API call
    const results = json.mock.calls[0][0];


    const request2 = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "date": "2023-03-20",
            "time": "12:00:00",
            "activities": results,
            "minWeather": {
                "cond": "cloudy",
                "minTemp": 10
            }
        })
    }

    //clear the mock values from previous API call
    json.mockClear();
    status.mockClear();
    fetchWrapper.get.mockClear();

    fetchWrapper.get.mockImplementation(() => {
        return ({"data": [
            {
                "weather": {
                    "description": "sunny"
                },
                "temp": 20,
                "timestamp_local": "2023-03-20T13:00:00"
            }
        ]})
    }).mockImplementationOnce(() => {
        return ({"data": [
            {
                "weather": {
                    "description": "rainy"
                },
                "temp": 5,
                "timestamp_local": "2023-03-20T13:00:00"
            }
        ]})
    });
    

    await filterByWeather(request2, response);

    expect(json.mock.calls[0][0].output).toMatchObject([
        {
          name: 'Discovery Island Marine Provincial Park',
          lat: '48.4548',
          lon: '-123.2661',
          distance: '5.2'
        },
        {
          name: 'Goldstream Provincial Park',
          lat: '48.4709',
          lon: '-123.5521',
          distance: '16.8'
        },
        {
          name: 'Gowlland Tod Provincial Park',
          lat: '48.5420',
          lon: '-123.5237',
          distance: '16.2'
        },
        {
          name: 'John Dean Provincial Park',
          lat: '48.6136',
          lon: '-123.4450',
          distance: '17.4'
        }
    ]);   
});