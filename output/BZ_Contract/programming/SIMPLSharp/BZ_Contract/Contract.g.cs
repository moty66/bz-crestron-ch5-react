using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace BZ_Contract
{
    /// <summary>
    /// Common Interface for Root Contracts.
    /// </summary>
    public interface IContract
    {
        object UserObject { get; set; }
        void AddDevice(BasicTriListWithSmartObject device);
        void RemoveDevice(BasicTriListWithSmartObject device);
    }

    public class Contract : IContract, IDisposable
    {
        #region Components

        private ComponentMediator ComponentMediator { get; set; }

        public BZ_Contract.IZone[] Lighting_zone { get { return InternalLighting_zone.Cast<BZ_Contract.IZone>().ToArray(); } }
        private BZ_Contract.Zone[] InternalLighting_zone { get; set; }

        #endregion

        #region Construction and Initialization

        private static readonly IDictionary<int, uint> Lighting_zoneSmartObjectIdMappings = new Dictionary<int, uint>{
            { 0, 1 }, { 1, 17 }, { 2, 33 }, { 3, 49 }, { 4, 65 }, { 5, 81 }, { 6, 97 }, { 7, 113 }, { 8, 129 }, { 9, 145 }, { 10, 161 }, { 11, 177 }, 
            { 12, 193 }, { 13, 209 }, { 14, 225 }, { 15, 241 }, { 16, 257 }, { 17, 273 }, { 18, 289 }, { 19, 305 }, { 20, 321 }, { 21, 337 }, { 22, 353 }, 
            { 23, 369 }, { 24, 385 }, { 25, 401 }, { 26, 417 }, { 27, 433 }, { 28, 449 }, { 29, 465 }, { 30, 481 }, { 31, 497 }, { 32, 513 }, { 33, 529 }, 
            { 34, 545 }, { 35, 561 }, { 36, 577 }, { 37, 593 }, { 38, 609 }, { 39, 625 }};

        public Contract()
            : this(new List<BasicTriListWithSmartObject>().ToArray())
        {
        }

        public Contract(BasicTriListWithSmartObject device)
            : this(new [] { device })
        {
        }

        public Contract(BasicTriListWithSmartObject[] devices)
        {
            if (devices == null)
                throw new ArgumentNullException("Devices is null");

            ComponentMediator = new ComponentMediator();

            InternalLighting_zone = new BZ_Contract.Zone[Lighting_zoneSmartObjectIdMappings.Count];
            for (int index = 0; index < Lighting_zoneSmartObjectIdMappings.Count; index++)
            {
                InternalLighting_zone[index] = new BZ_Contract.Zone(ComponentMediator, Lighting_zoneSmartObjectIdMappings[index]);
            }

            for (int index = 0; index < devices.Length; index++)
            {
                AddDevice(devices[index]);
            }
        }

        public static void ClearDictionaries()
        {
            Lighting_zoneSmartObjectIdMappings.Clear();

        }

        #endregion

        #region Standard Contract Members

        public object UserObject { get; set; }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            for (int index = 0; index < 40; index++)
            {
                InternalLighting_zone[index].AddDevice(device);
            }
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            for (int index = 0; index < 40; index++)
            {
                InternalLighting_zone[index].RemoveDevice(device);
            }
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            for (int index = 0; index < 40; index++)
            {
                InternalLighting_zone[index].Dispose();
            }
            ComponentMediator.Dispose(); 
        }

        #endregion

    }
}
