using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace BZ_Contract
{
    public interface ILighting
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> set_off;
        event EventHandler<UIEventArgs> toggle;
        event EventHandler<UIEventArgs> set_value;

        void only_on_off(LightingBoolInputSigDelegate callback);
        void is_on(LightingBoolInputSigDelegate callback);
        void current_value(LightingUShortInputSigDelegate callback);

    }

    public delegate void LightingBoolInputSigDelegate(BoolInputSig boolInputSig, ILighting lighting);
    public delegate void LightingUShortInputSigDelegate(UShortInputSig uShortInputSig, ILighting lighting);

    internal class Lighting : ILighting, IDisposable
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
                public const uint set_off = 1;
                public const uint toggle = 2;

                public const uint only_on_off = 1;
                public const uint is_on = 2;
            }
            internal static class Numerics
            {
                public const uint set_value = 1;

                public const uint current_value = 1;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Lighting(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.set_off, onset_off);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.toggle, ontoggle);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.set_value, onset_value);

        }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            Devices.Add(device);
            ComponentMediator.HookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            Devices.Remove(device);
            ComponentMediator.UnHookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
        }

        #endregion

        #region CH5 Contract

        public event EventHandler<UIEventArgs> set_off;
        private void onset_off(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = set_off;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> toggle;
        private void ontoggle(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = toggle;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void only_on_off(LightingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.only_on_off], this);
            }
        }

        public void is_on(LightingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.is_on], this);
            }
        }

        public event EventHandler<UIEventArgs> set_value;
        private void onset_value(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = set_value;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void current_value(LightingUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.current_value], this);
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
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Lighting", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            set_off = null;
            toggle = null;
            set_value = null;
        }

        #endregion

    }
}
