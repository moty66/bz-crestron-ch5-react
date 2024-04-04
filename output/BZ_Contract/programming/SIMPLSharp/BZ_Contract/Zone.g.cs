using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace BZ_Contract
{
    public interface IZone
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> zone_toggle;
        event EventHandler<UIEventArgs> off_zone;

        void zone_is_on(ZoneBoolInputSigDelegate callback);

        BZ_Contract.ILighting[] Lighting_channel { get; }
        BZ_Contract.ICurtains[] Curtains { get; }
    }

    public delegate void ZoneBoolInputSigDelegate(BoolInputSig boolInputSig, IZone zone);

    internal class Zone : IZone, IDisposable
    {
        #region Standard CH5 Component members

        private ComponentMediator ComponentMediator { get; set; }

        public object UserObject { get; set; }

        public uint ControlJoinId { get; private set; }

        private IList<BasicTriListWithSmartObject> _devices;
        public IList<BasicTriListWithSmartObject> Devices { get { return _devices; } }

        #endregion

        #region Joins

        private static class Joins
        {
            internal static class Booleans
            {
                public const uint zone_toggle = 1;
                public const uint off_zone = 2;

                public const uint zone_is_on = 1;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Zone(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private static readonly IDictionary<uint, List<uint>> Lighting_channelSmartObjectIdMappings = new Dictionary<uint, List<uint>> {
            { 1, new List<uint> { 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 } }, { 17, new List<uint> { 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 } }, 
            { 33, new List<uint> { 34, 35, 36, 37, 38, 39, 40, 41, 42, 43 } }, { 49, new List<uint> { 50, 51, 52, 53, 54, 55, 56, 57, 58, 59 } }, 
            { 65, new List<uint> { 66, 67, 68, 69, 70, 71, 72, 73, 74, 75 } }, { 81, new List<uint> { 82, 83, 84, 85, 86, 87, 88, 89, 90, 91 } }, 
            { 97, new List<uint> { 98, 99, 100, 101, 102, 103, 104, 105, 106, 107 } }, 
            { 113, new List<uint> { 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 } }, 
            { 129, new List<uint> { 130, 131, 132, 133, 134, 135, 136, 137, 138, 139 } }, 
            { 145, new List<uint> { 146, 147, 148, 149, 150, 151, 152, 153, 154, 155 } }, 
            { 161, new List<uint> { 162, 163, 164, 165, 166, 167, 168, 169, 170, 171 } }, 
            { 177, new List<uint> { 178, 179, 180, 181, 182, 183, 184, 185, 186, 187 } }, 
            { 193, new List<uint> { 194, 195, 196, 197, 198, 199, 200, 201, 202, 203 } }, 
            { 209, new List<uint> { 210, 211, 212, 213, 214, 215, 216, 217, 218, 219 } }, 
            { 225, new List<uint> { 226, 227, 228, 229, 230, 231, 232, 233, 234, 235 } }, 
            { 241, new List<uint> { 242, 243, 244, 245, 246, 247, 248, 249, 250, 251 } }, 
            { 257, new List<uint> { 258, 259, 260, 261, 262, 263, 264, 265, 266, 267 } }, 
            { 273, new List<uint> { 274, 275, 276, 277, 278, 279, 280, 281, 282, 283 } }, 
            { 289, new List<uint> { 290, 291, 292, 293, 294, 295, 296, 297, 298, 299 } }, 
            { 305, new List<uint> { 306, 307, 308, 309, 310, 311, 312, 313, 314, 315 } }, 
            { 321, new List<uint> { 322, 323, 324, 325, 326, 327, 328, 329, 330, 331 } }, 
            { 337, new List<uint> { 338, 339, 340, 341, 342, 343, 344, 345, 346, 347 } }, 
            { 353, new List<uint> { 354, 355, 356, 357, 358, 359, 360, 361, 362, 363 } }, 
            { 369, new List<uint> { 370, 371, 372, 373, 374, 375, 376, 377, 378, 379 } }, 
            { 385, new List<uint> { 386, 387, 388, 389, 390, 391, 392, 393, 394, 395 } }, 
            { 401, new List<uint> { 402, 403, 404, 405, 406, 407, 408, 409, 410, 411 } }, 
            { 417, new List<uint> { 418, 419, 420, 421, 422, 423, 424, 425, 426, 427 } }, 
            { 433, new List<uint> { 434, 435, 436, 437, 438, 439, 440, 441, 442, 443 } }, 
            { 449, new List<uint> { 450, 451, 452, 453, 454, 455, 456, 457, 458, 459 } }, 
            { 465, new List<uint> { 466, 467, 468, 469, 470, 471, 472, 473, 474, 475 } }, 
            { 481, new List<uint> { 482, 483, 484, 485, 486, 487, 488, 489, 490, 491 } }, 
            { 497, new List<uint> { 498, 499, 500, 501, 502, 503, 504, 505, 506, 507 } }, 
            { 513, new List<uint> { 514, 515, 516, 517, 518, 519, 520, 521, 522, 523 } }, 
            { 529, new List<uint> { 530, 531, 532, 533, 534, 535, 536, 537, 538, 539 } }, 
            { 545, new List<uint> { 546, 547, 548, 549, 550, 551, 552, 553, 554, 555 } }, 
            { 561, new List<uint> { 562, 563, 564, 565, 566, 567, 568, 569, 570, 571 } }, 
            { 577, new List<uint> { 578, 579, 580, 581, 582, 583, 584, 585, 586, 587 } }, 
            { 593, new List<uint> { 594, 595, 596, 597, 598, 599, 600, 601, 602, 603 } }, 
            { 609, new List<uint> { 610, 611, 612, 613, 614, 615, 616, 617, 618, 619 } }, 
            { 625, new List<uint> { 626, 627, 628, 629, 630, 631, 632, 633, 634, 635 } }};
        private static readonly IDictionary<uint, List<uint>> CurtainsSmartObjectIdMappings = new Dictionary<uint, List<uint>> {
            { 1, new List<uint> { 12, 13, 14, 15, 16 } }, { 17, new List<uint> { 28, 29, 30, 31, 32 } }, { 33, new List<uint> { 44, 45, 46, 47, 48 } }, 
            { 49, new List<uint> { 60, 61, 62, 63, 64 } }, { 65, new List<uint> { 76, 77, 78, 79, 80 } }, { 81, new List<uint> { 92, 93, 94, 95, 96 } }, 
            { 97, new List<uint> { 108, 109, 110, 111, 112 } }, { 113, new List<uint> { 124, 125, 126, 127, 128 } }, 
            { 129, new List<uint> { 140, 141, 142, 143, 144 } }, { 145, new List<uint> { 156, 157, 158, 159, 160 } }, 
            { 161, new List<uint> { 172, 173, 174, 175, 176 } }, { 177, new List<uint> { 188, 189, 190, 191, 192 } }, 
            { 193, new List<uint> { 204, 205, 206, 207, 208 } }, { 209, new List<uint> { 220, 221, 222, 223, 224 } }, 
            { 225, new List<uint> { 236, 237, 238, 239, 240 } }, { 241, new List<uint> { 252, 253, 254, 255, 256 } }, 
            { 257, new List<uint> { 268, 269, 270, 271, 272 } }, { 273, new List<uint> { 284, 285, 286, 287, 288 } }, 
            { 289, new List<uint> { 300, 301, 302, 303, 304 } }, { 305, new List<uint> { 316, 317, 318, 319, 320 } }, 
            { 321, new List<uint> { 332, 333, 334, 335, 336 } }, { 337, new List<uint> { 348, 349, 350, 351, 352 } }, 
            { 353, new List<uint> { 364, 365, 366, 367, 368 } }, { 369, new List<uint> { 380, 381, 382, 383, 384 } }, 
            { 385, new List<uint> { 396, 397, 398, 399, 400 } }, { 401, new List<uint> { 412, 413, 414, 415, 416 } }, 
            { 417, new List<uint> { 428, 429, 430, 431, 432 } }, { 433, new List<uint> { 444, 445, 446, 447, 448 } }, 
            { 449, new List<uint> { 460, 461, 462, 463, 464 } }, { 465, new List<uint> { 476, 477, 478, 479, 480 } }, 
            { 481, new List<uint> { 492, 493, 494, 495, 496 } }, { 497, new List<uint> { 508, 509, 510, 511, 512 } }, 
            { 513, new List<uint> { 524, 525, 526, 527, 528 } }, { 529, new List<uint> { 540, 541, 542, 543, 544 } }, 
            { 545, new List<uint> { 556, 557, 558, 559, 560 } }, { 561, new List<uint> { 572, 573, 574, 575, 576 } }, 
            { 577, new List<uint> { 588, 589, 590, 591, 592 } }, { 593, new List<uint> { 604, 605, 606, 607, 608 } }, 
            { 609, new List<uint> { 620, 621, 622, 623, 624 } }, { 625, new List<uint> { 636, 637, 638, 639, 640 } }};

        internal static void ClearDictionaries()
        {
            Lighting_channelSmartObjectIdMappings.Clear();
            CurtainsSmartObjectIdMappings.Clear();
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.zone_toggle, onzone_toggle);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.off_zone, onoff_zone);

            List<uint> lighting_channelList = Lighting_channelSmartObjectIdMappings[controlJoinId];
            Lighting_channel = new BZ_Contract.ILighting[lighting_channelList.Count];
            for (int index = 0; index < lighting_channelList.Count; index++)
            {
                Lighting_channel[index] = new BZ_Contract.Lighting(ComponentMediator, lighting_channelList[index]); 
            }

            List<uint> curtainsList = CurtainsSmartObjectIdMappings[controlJoinId];
            Curtains = new BZ_Contract.ICurtains[curtainsList.Count];
            for (int index = 0; index < curtainsList.Count; index++)
            {
                Curtains[index] = new BZ_Contract.Curtains(ComponentMediator, curtainsList[index]); 
            }

        }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            Devices.Add(device);
            ComponentMediator.HookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
            for (int index = 0; index < Lighting_channel.Length; index++)
            {
                ((BZ_Contract.Lighting)Lighting_channel[index]).AddDevice(device);
            }
            for (int index = 0; index < Curtains.Length; index++)
            {
                ((BZ_Contract.Curtains)Curtains[index]).AddDevice(device);
            }
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            Devices.Remove(device);
            ComponentMediator.UnHookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
            for (int index = 0; index < Lighting_channel.Length; index++)
            {
                ((BZ_Contract.Lighting)Lighting_channel[index]).RemoveDevice(device);
            }
            for (int index = 0; index < Curtains.Length; index++)
            {
                ((BZ_Contract.Curtains)Curtains[index]).RemoveDevice(device);
            }
        }

        #endregion

        #region CH5 Contract

        public BZ_Contract.ILighting[] Lighting_channel { get; private set; }

        public BZ_Contract.ICurtains[] Curtains { get; private set; }

        public event EventHandler<UIEventArgs> zone_toggle;
        private void onzone_toggle(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = zone_toggle;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> off_zone;
        private void onoff_zone(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = off_zone;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void zone_is_on(ZoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.zone_is_on], this);
            }
        }

        #endregion

        #region Overrides

        public override int GetHashCode()
        {
            return (int)ControlJoinId;
        }

        public override string ToString()
        {
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Zone", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            for (int index = 0; index < Lighting_channel.Length; index++)
            {
                ((BZ_Contract.Lighting)Lighting_channel[index]).Dispose();
            }
            for (int index = 0; index < Curtains.Length; index++)
            {
                ((BZ_Contract.Curtains)Curtains[index]).Dispose();
            }

            zone_toggle = null;
            off_zone = null;
        }

        #endregion

    }
}
